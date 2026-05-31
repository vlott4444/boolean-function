import { SubjectDetailComponent } from "../../components/subject-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class SubjectPage {
    constructor(parent, subject) {
        this.parent = parent;
        this.subject = subject;


        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
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
                    </div>
                    <div class="col-md-6">
                        <div id="model-container" style="height: 400px; background: #111; border-radius: 12px;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    clickBack() {

        this.dispose3D();
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }


    async init3D() {
    const container = document.getElementById('model-container');
    if (!container) return;


    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf1f5f9);
    this.scene.fog = new THREE.FogExp2(0xf1f5f9, 0.008);


    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(2, 1.5, 2.5);


    this.renderer = new THREE.WebGLRenderer({ antialias: true });
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
    const modelPath = './models/calculator.glb'; // или '/models/calculator.glb'
    try {
        const gltf = await loader.loadAsync(modelPath);
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

        const distance = targetSize * 1.5; // коэффициент "отдаления"
        this.camera.position.set(distance * 0.8, distance * 0.6, distance);
        this.controls.update();

    } catch (error) {
        console.error('Ошибка загрузки модели:', error);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xaa44ff });
        const fallback = new THREE.Mesh(geometry, material);
        fallback.position.y = 0.5;
        this.scene.add(fallback);
        this.controls.target.set(0, 0.5, 0);
        this.controls.update();
    }


    const animate = () => {
        requestAnimationFrame(animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    };
    animate();


    window.addEventListener('resize', () => this.onWindowResize(container));
    }


    dispose3D() {
        if (this.renderer) {
            this.renderer.dispose();
            const container = document.getElementById('model-container');
            if (container && this.renderer.domElement) {
                container.removeChild(this.renderer.domElement);
            }
        }
        if (this.controls) this.controls.dispose();
        window.removeEventListener('resize', this.onWindowResize);
    }


    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);


        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));


        const detailContainer = document.getElementById('detail-container');
        const detail = new SubjectDetailComponent(detailContainer);
        detail.render(this.subject);


        this.init3D();
    }
}
