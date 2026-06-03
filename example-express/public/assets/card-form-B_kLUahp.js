import{l as e}from"./index-bbdYfTbe.js";var t,n=e((()=>{t=class{constructor(e,t=null){this.parent=e,this.data=t}getHTML(){let e=this.data?.title||``,t=this.data?.text||``,n=this.data?.src||this.data?.icon||``;return`
            <div class="card mt-4">
                <div class="card-body">
                    <h5 class="card-title">${this.data?`Редактировать карточку`:`Добавить новую карточку`}</h5>

                    <div class="mb-3">
                        <label for="card-title" class="form-label">Заголовок</label>
                        <input type="text" class="form-control" id="card-title" value="${e}" required>
                    </div>

                    <div class="mb-3">
                        <label for="card-text" class="form-label">Текст</label>
                        <textarea class="form-control" id="card-text" rows="3" required>${t}</textarea>
                    </div>

                    <div class="mb-3">
                        <label for="card-icon" class="form-label">URL иконки</label>
                        <input type="text" class="form-control" id="card-icon" value="${n}" placeholder="images/calculators.png">
                    </div>

                    <button id="save-card-btn" class="btn" style="background-color: #DB3F59; color: white; border: none;">Сохранить</button>
                </div>
            </div>
        `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t);let n=document.getElementById(`save-card-btn`);n&&n.addEventListener(`click`,e)}}}));export{n,t};