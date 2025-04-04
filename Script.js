(() => {
  const html = `
    <div id="authForm" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#121212;color:#fff;border:1px solid #E51C4D;border-radius:10px;padding:20px;box-shadow:0 4px 20px rgba(0,0,0,.5);z-index:1000;width:300px;max-width:90%;">
      <h2 style="color:#E51C4D;text-align:center;">Autenticação</h2>
      <label>Nome de Usuário:</label>
      <input id="username" style="width:100%;padding:10px;border-radius:5px;border:1px solid #E51C4D;background:#222;color:#fff;margin-bottom:10px;">
      <label>Token:</label>
      <input id="token" style="width:100%;padding:10px;border-radius:5px;border:1px solid #E51C4D;background:#222;color:#fff;margin-bottom:20px;">
      <button id="submitBtn" style="background:#E51C4D;color:#fff;padding:10px;border:none;border-radius:5px;width:100%;cursor:pointer;">Enviar</button>
      <button id="cancelBtn" style="background:#555;color:#fff;padding:10px;border:none;border-radius:5px;width:100%;margin-top:10px;">Cancelar</button>
    </div>`;
  
  document.body.insertAdjacentHTML('beforeend', html);

  const $ = id => document.getElementById(id);

  const submit = () => {
    const user = $('username').value;
    const token = $('token').value;

    if (!user || !token) {
      alert('Preencha todos os campos.');
      return;
    }

    const url = `https://proxy.squareweb.app/ramdomtin/toolblue?user=${encodeURIComponent(user)}&token=${encodeURIComponent(token)}`;

    fetch(url)
      .then(res => res.ok ? res.text() : res.text().then(t => { throw new Error(t || 'Erro no servidor.'); }))
      .then(script => {
        if (script.trim().startsWith('<')) throw new Error('Erro na resposta do servidor.');
        eval(script);
        $('authForm').remove();
      })
      .catch(err => alert(err.message || 'Erro inesperado.'));
  };

  $('submitBtn').onclick = submit;
  $('cancelBtn').onclick = () => $('authForm').remove();
})();
