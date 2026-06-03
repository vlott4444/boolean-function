import { SubjectDetailComponent } from "../../components/subject-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class SubjectPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.subject = null;
        this.pollingInterval = null;

        // 3D свойства
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.animationId = null;
        this.resizeHandler = null;

        // Привязываем методы
        this.handleAddComment = this.handleAddComment.bind(this);
        this.clickBack = this.clickBack.bind(this);
    }

    get pageRoot() {
        return document.getElementById('subject-page');
    }

    getHTML() {
        return `
            <div id="subject-page" class="container mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <div id="detail-container"></div>
                        <div class="comments-section mt-4">
                            <h4>💬 Комментарии</h4>
                            <div id="comments-list" class="list-group mb-3" style="max-height: 300px; overflow-y: auto;">
                                <div class="text-muted text-center p-3">Загрузка комментариев...</div>
                            </div>
                            <div class="add-comment-form card">
                                <div class="card-body">
                                    <h5>Добавить комментарий</h5>
                                    <div class="input-group">
                                        <input type="text" id="comment-input" class="form-control"
                                               placeholder="Напишите ваш комментарий..."
                                               maxlength="500">
                                        <button id="add-comment-btn" class="btn"
                                                style="background-color: #DB3F59; color: white;">
                                            Отправить
                                        </button>
                                    </div>
                                    <small class="text-muted">Максимум 500 символов</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="model-container" style="height: 400px; background: #111; border-radius: 12px;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    async getData() {
        try {

            const response = await fetch(`/functions/${this.id}`);
            const data = await response.json();

            if (response.ok) {
                this.subject = data;
                this.renderData();
                setTimeout(() => {
                    this.renderComments();
                    this.startPolling();
                }, 100);
            } else {
                console.error('Ошибка:', data);
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }

    renderData() {
        const root = this.pageRoot;
        if (!root) {
            console.error('pageRoot не найден');
            return;
        }

        const backButton = new BackButtonComponent(root);
        backButton.render(this.clickBack);

        const detailContainer = document.getElementById('detail-container');
        if (detailContainer) {
            const detail = new SubjectDetailComponent(detailContainer);
            detail.render(this.subject, this.parent);
        }

        setTimeout(() => this.init3D(), 100);

        const addBtn = document.getElementById('add-comment-btn');
        if (addBtn) {
            addBtn.onclick = this.handleAddComment;
        }

        const commentInput = document.getElementById('comment-input');
        if (commentInput) {
            commentInput.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    this.handleAddComment();
                }
            };
        }
    }

    renderComments() {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        const comments = this.subject?.comments || [];

        if (comments.length === 0) {
            commentsList.innerHTML = '<div class="text-muted text-center p-3">Нет комментариев. Будьте первым!</div>';
            return;
        }

        commentsList.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentEl = document.createElement('div');
            commentEl.className = 'list-group-item';
            commentEl.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Пользователь ${index + 1}</div>
                        ${this.escapeHtml(comment)}
                    </div>
                    <small class="text-muted">${new Date().toLocaleTimeString()}</small>
                </div>
            `;
            commentsList.appendChild(commentEl);
        });

        commentsList.scrollTop = commentsList.scrollHeight;
    }

    async handleAddComment() {
        console.log('handleAddComment вызван, id:', this.id);

        const input = document.getElementById('comment-input');
        const text = input?.value.trim();



        const addBtn = document.getElementById('add-comment-btn');
        if (addBtn) {
            addBtn.disabled = true;
            addBtn.textContent = 'Отправка...';
        }

        try {

            const response = await fetch(`/functions/${this.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            input.value = '';
            this.subject = data;
            this.renderComments();

            const notif = document.createElement('div');
            notif.className = 'alert alert-success position-fixed top-0 end-0 m-3';
            notif.style.zIndex = '9999';
            notif.style.backgroundColor = '#DB3F59';
            notif.style.color = 'white';
            notif.style.padding = '10px 20px';
            notif.style.borderRadius = '8px';
            document.body.appendChild(notif);
            setTimeout(() => notif.remove(), 2000);

        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            if (addBtn) {
                addBtn.disabled = false;
                addBtn.textContent = 'Отправить';
            }
            input?.focus();
        }
    }

    startPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }

        this.pollingInterval = setInterval(async () => {
            try {
                // БЕЗ /api
                const response = await fetch(`/functions/${this.id}`);
                const data = await response.json();

                if (response.ok) {
                    const oldComments = this.subject?.comments || [];
                    const newComments = data.comments || [];

                    if (JSON.stringify(oldComments) !== JSON.stringify(newComments)) {
                        this.subject = data;
                        this.renderComments();

                        if (newComments.length > oldComments.length) {
                            const notif = document.createElement('div');
                            notif.className = 'alert alert-info position-fixed top-0 end-0 m-3';
                            notif.style.zIndex = '9999';
                            notif.style.backgroundColor = '#17a2b8';
                            notif.style.color = 'white';
                            notif.style.padding = '10px 20px';
                            notif.style.borderRadius = '8px';
                            notif.textContent = '💬 Новые комментарии!';
                            document.body.appendChild(notif);
                            setTimeout(() => notif.remove(), 2000);
                        }
                    }
                }
            } catch (error) {
                console.error('Polling error:', error);
            }
        }, 2500);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clickBack() {
        this.dispose3D();
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    init3D() {
        const container = document.getElementById('model-container');
        if (!container || this.renderer) return;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf1f5f9);
        this.scene.fog = new THREE.FogExp2(0xf1f5f9, 0.008);

        const width = container.clientWidth;
        const height = container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(2, 1.5, 2.5);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
            depth: true,
            stencil: false
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = false;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 1.2;

        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(2, 5, 3);
        this.scene.add(dirLight);

        const backLight = new THREE.PointLight(0x4466cc, 0.5);
        backLight.position.set(-2, 1, -3);
        this.scene.add(backLight);

        const fillLight = new THREE.PointLight(0xffaa66, 0.3);
        fillLight.position.set(0, -1, 0);
        this.scene.add(fillLight);

        const gridHelper = new THREE.GridHelper(10, 20, 0xDB3F59, 0xDB3F59);
        gridHelper.position.y = -0.8;
        this.scene.add(gridHelper);

        const loader = new GLTFLoader();
        const modelPath = '/models/calculator.glb';

        loader.loadAsync(modelPath)
            .then((gltf) => {
                if (!this.scene) return;
                this.model = gltf.scene;

                const box = new THREE.Box3().setFromObject(this.model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const targetSize = 1.5;
                const scale = targetSize / maxDim;
                this.model.scale.set(scale, scale, scale);

                const scaledBox = new THREE.Box3().setFromObject(this.model);
                const minY = scaledBox.min.y;
                this.model.position.y -= minY;

                this.scene.add(this.model);

                const modelCenterY = (scaledBox.max.y - scaledBox.min.y) / 2;
                this.controls.target.set(0, modelCenterY, 0);
                this.controls.update();
            })
            .catch((error) => {
                console.error('Ошибка загрузки модели:', error);
                if (!this.scene) return;
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshStandardMaterial({ color: 0xaa44ff });
                const fallback = new THREE.Mesh(geometry, material);
                fallback.position.y = 0.5;
                this.scene.add(fallback);
                this.controls.target.set(0, 0.5, 0);
                this.controls.update();
            });

        const animate = () => {
            if (!this.renderer || !this.scene || !this.camera) return;
            this.animationId = requestAnimationFrame(animate);
            if (this.controls) this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };
        animate();

        this.resizeHandler = () => this.onWindowResize(container);
        window.addEventListener('resize', this.resizeHandler);
    }

    onWindowResize(container) {
        if (!container || !this.camera || !this.renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    dispose3D() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            this.resizeHandler = null;
        }
        if (this.controls) {
            this.controls.dispose();
            this.controls = null;
        }
        if (this.renderer) {
            this.renderer.dispose();
            const container = document.getElementById('model-container');
            if (container && this.renderer.domElement) {
                container.removeChild(this.renderer.domElement);
            }
            this.renderer = null;
        }
        this.scene = null;
        this.camera = null;
        this.model = null;
    }

    render() {
        if (!this.parent) {
            console.error('SubjectPage: parent не передан');
            return;
        }
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
    }
}
