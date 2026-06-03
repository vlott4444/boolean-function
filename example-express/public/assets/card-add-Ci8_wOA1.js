import{a as e,i as t,n,o as r,r as i,s as a,t as o}from"./index-Bs-qtM2T.js";var s,c=a((()=>{s=class{constructor(e,t=null){this.parent=e,this.data=t}getHTML(){let e=this.data?.title||``,t=this.data?.text||``,n=this.data?.src||this.data?.icon||``;return`
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
        `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t);let n=document.getElementById(`save-card-btn`);n&&n.addEventListener(`click`,e)}}})),l,u=a((()=>{l=class{constructor(e){this.parent=e}addListeners(e){if(!this.parent){console.error(`Родительский элемент не передан`);return}let t=this.parent.querySelector(`#back-button`);t?t.addEventListener(`click`,e):console.error(`Кнопка с id="back-button" не найдена в родителе:`,this.parent)}getHTML(){return`<button id="back-button" class="btn" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 8px 20px; color: white; font-family: 'Roboto', sans-serif; font-weight: 500; margin-bottom: 20px;">Домой</button>`}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),this.addListeners(e)}}})),d;a((()=>{c(),u(),n(),r(),t(),d=class{constructor(e){this.parent=e}get pageRoot(){return document.getElementById(`card-add-page`)}getHTML(){return`<div id="card-add-page" class="container mt-4"></div>`}async saveCard(){let t={title:document.getElementById(`card-title`)?.value,text:document.getElementById(`card-text`)?.value,src:document.getElementById(`card-icon`)?.value||`images/default.png`};console.log(`Отправляемые данные:`,t);try{let{data:n,status:r}=await e.post(i.createFunction(),t);r===201||r===200?new o(this.parent).render():console.error(`Ошибка при добавлении, статус:`,r)}catch(e){console.error(`Ошибка:`,e)}}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e);let t=this.pageRoot;new l(t).render(()=>{new o(this.parent).render()}),new s(t).render(this.saveCard.bind(this))}}}))();export{d as CardAddPage};