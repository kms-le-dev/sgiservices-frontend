import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { api } from "../services/api";
import "./AdminDashboard.css";

function Header() {
  return (
    <header className="admin-header">
      <div className="container">
        <h1 className="header-title">Admin - Tableau de bord</h1>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="admin-footer">
      {/* <div className="footer-inner">© {new Date().getFullYear()} SGIServices</div> */}
    </footer>
  );
}

function UsersView() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [editVisiblePasswords, setEditVisiblePasswords] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }

  function startEdit(u) {
    setEditingId(u.id);
    setForm({ name: u.name || "", email: u.email || "", phone: u.phone || "", role: u.role || "", password: "" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({});
  }

  function toggleVisible(id) {
    setVisiblePasswords(v => ({ ...v, [id]: !v[id] }));
  }

  function toggleEditVisible(id) {
    setEditVisiblePasswords(v => ({ ...v, [id]: !v[id] }));
  }

  function saveUser(id) {
    const payload = { ...form };
    if (!payload.password) delete payload.password;
    setErrorMsg(null);
    setSavingId(id);
    api
      .put(`/users/${id}`, payload)
      .then(() => {
        // refresh list and exit edit mode
        fetchUsers();
        cancelEdit();
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err?.response?.data?.message || 'Erreur lors de la sauvegarde');
      })
      .finally(() => {
        setSavingId(null);
      });
  }

  function deleteUser(id) {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    api
      .delete(`/users/${id}`)
      .then(() => fetchUsers())
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2 className="view-title">Utilisateurs</h2>
      <div className="table-wrap">
        <table className="table users-table">
          <thead>
            <tr>
              <th className="th">Nom</th>
              <th className="th">Email</th>
              <th className="th">Téléphone</th>
              <th className="th">Mot de passe</th>
              <th className="th">Rôle</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="td">
                  {editingId === u.id ? (
                    <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  ) : (
                    u.name
                  )}
                </td>
                <td className="td">
                  {editingId === u.id ? (
                    <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  ) : (
                    u.email
                  )}
                </td>
                <td className="td">
                  {editingId === u.id ? (
                    <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  ) : (
                    u.phone
                  )}
                </td>
                <td className="td password-cell">
                  {editingId === u.id ? (
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <input className="input" type={editVisiblePasswords[u.id] ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                      <button type="button" className="btn-sm btn-gap" onClick={() => toggleEditVisible(u.id)}>{editVisiblePasswords[u.id] ? 'Cacher' : 'Voir'}</button>
                    </div>
                  ) : (
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <span className="password-display">{(u.password && u.password.length > 0) ? (visiblePasswords[u.id] ? u.password : '••••••') : '••••••'}</span>
                      <button type="button" className="btn-sm btn-gap" onClick={() => toggleVisible(u.id)}>{visiblePasswords[u.id] ? 'Cacher' : 'Voir'}</button>
                    </div>
                  )}
                </td>
                <td className="td">
                  {editingId === u.id ? (
                    <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    <span className="role-cell" onClick={() => startEdit(u)}>{u.role}</span>
                  )}
                </td>
                <td className="td">
                  {editingId === u.id ? (
                    <div className="actions">
                      <input placeholder="Nouveau mot de passe" type="password" className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                      <button type="button" className="btn-cta" onClick={() => saveUser(u.id)} disabled={savingId === u.id}>{savingId === u.id ? 'Enregistrement...' : 'Enregistrer'}</button>
                      <button type="button" className="btn-muted" onClick={cancelEdit} disabled={savingId === u.id}>Annuler</button>
                    </div>
                  ) : (
                    <div className="actions">
                      <button type="button" className="btn-cta" onClick={() => startEdit(u)}>Modifier</button>
                      <button type="button" className="btn-danger" onClick={() => deleteUser(u.id)}>Supprimer</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errorMsg && <div style={{color:'var(--red)', textAlign:'center', marginTop:10}}>{errorMsg}</div>}
    </div>
  );
}

function ItemsListView({ type, endpoint, categories }) {
  // type: 'Services' | 'Galerie' | 'Blog'
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", category: categories ? categories[0] : "", image: null });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewIsObject, setPreviewIsObject] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  // cleanup object URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (previewIsObject && preview) {
        try { URL.revokeObjectURL(preview); } catch (err) {}
      }
    };
  }, [preview, previewIsObject]);

  function fetchItems() {
    api
      .get(endpoint)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }

  function handleFileChange(e) {
    const f = e.target.files[0];
    // revoke previous object URL if any
    if (previewIsObject && preview) {
      try { URL.revokeObjectURL(preview); } catch (err) {}
    }
    if (!f) {
      setForm({ ...form, image: null });
      setPreview(null);
      setPreviewIsObject(false);
      return;
    }
    // client-side check: must be an image
    if (!f.type || !f.type.startsWith('image/')) {
      setFormError('Le fichier sélectionné doit être une image.');
      setForm({ ...form, image: null });
      setPreview(null);
      setPreviewIsObject(false);
      return;
    }
    setFormError(null);
    setForm({ ...form, image: f });
    const objUrl = URL.createObjectURL(f);
    setPreview(objUrl);
    setPreviewIsObject(true);
  }

  function submitForm(e) {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);
    setSubmitting(true);

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    if (form.category) fd.append("category", form.category);
    if (form.image) fd.append("image", form.image);

    // debug: log FormData entries to ensure file is attached correctly
    try {
      for (const pair of fd.entries()) {
        // File objects will show as File in console
        // eslint-disable-next-line no-console
        console.log('FormData entry:', pair[0], pair[1]);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Could not enumerate FormData entries', err);
    }

    api
      .post(endpoint, fd, { headers: { Accept: 'application/json' } })
      .then(() => {
        setForm({ title: "", description: "", category: categories ? categories[0] : "", image: null });
        fetchItems();
        setSuccessMsg('Publication réalisée.');
        if (previewIsObject && preview) {
          try { URL.revokeObjectURL(preview); } catch (err) {}
        }
        setPreview(null);
        setPreviewIsObject(false);
      })
      .catch((err) => {
        console.error('Publish error', err);
        // extract Laravel validation errors if present
        const resp = err?.response?.data;
        if (resp && resp.errors) {
          const msgs = Object.values(resp.errors).flat().join(' ');
          setFormError(msgs);
        } else {
          const msg = resp?.message || err.message || 'Erreur lors de la publication';
          setFormError(msg);
        }
      })
      .finally(() => setSubmitting(false));
  }

  function startEdit(item) {
    setEditing(item.id);
    setForm({ title: item.title || "", description: item.description || "", category: item.category || (categories ? categories[0] : ""), image: null });
    // show existing image as preview (remote URL)
    const remote = item.image || item.featured_image || item.url || null;
    setPreview(remote);
    setPreviewIsObject(false);
  }

  function saveEdit(id) {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    if (form.category) fd.append("category", form.category);
    if (form.image) fd.append("image", form.image);

    // debug: log FormData entries before update
    try {
      for (const pair of fd.entries()) {
        // eslint-disable-next-line no-console
        console.log('Edit FormData entry:', pair[0], pair[1]);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Could not enumerate FormData entries', err);
    }

    api
      .post(`${endpoint}/` + id, fd, { headers: { Accept: 'application/json' } })
      .then(() => {
        setEditing(null);
        setForm({ title: "", description: "", category: categories ? categories[0] : "", image: null });
        fetchItems();
        if (previewIsObject && preview) {
          try { URL.revokeObjectURL(preview); } catch (err) {}
        }
        setPreview(null);
        setPreviewIsObject(false);
      })
      .catch((err) => {
        console.error('Save edit error', err);
        const resp = err?.response?.data;
        if (resp && resp.errors) {
          const msgs = Object.values(resp.errors).flat().join(' ');
          setFormError(msgs);
        } else {
          setFormError(resp?.message || err.message || 'Erreur lors de la sauvegarde');
        }
      });
  }

  function deleteItem(id) {
    if (!confirm("Supprimer cet élément ?")) return;
    api
      .delete(`${endpoint}/` + id)
      .then(() => fetchItems())
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2 className="view-title">{type}</h2>

      <form className="admin-form" onSubmit={submitForm} encType="multipart/form-data">
        {formError && <div style={{color:'var(--red)', marginBottom:10}}>{formError}</div>}
        {successMsg && <div style={{color:'green', marginBottom:10}}>{successMsg}</div>}
        <div style={{marginBottom:12}}>
          <label className="label">Titre</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" required />
        </div>
        <div style={{marginBottom:12}}>
          <label className="label">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" required />
        </div>
        {categories && (
          <div style={{marginBottom:12}}>
            <label className="label">Catégorie</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}
        <div style={{marginBottom:12}}>
          <label className="label">Image</label>
          <div className="file-input">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img src={preview} alt="Prévisualisation" style={{width:120, height:80, objectFit:'cover', borderRadius:8, boxShadow:'0 6px 18px rgba(2,6,23,0.06)', marginLeft:10}} />
            )}
          </div>
        </div>
        <button type="submit" className="btn-cta" disabled={submitting}>{submitting ? 'Publication...' : 'Publier'}</button>
      </form>

        <div style={{marginTop:18}}>
        <h3 className="section-subtitle">Toutes les publications</h3>
        <div className="list-stack fade-list">
          {items.map((it) => (
            <div key={it.id} className="admin-card">
              {editing === it.id ? (
                <div>
                  <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  <textarea className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  {categories && (
                    <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {preview && (
                    <div style={{marginTop:8}}>
                      <img src={preview} alt="Prévisualisation" style={{width:120, height:80, objectFit:'cover', borderRadius:8, boxShadow:'0 6px 18px rgba(2,6,23,0.06)'}} />
                    </div>
                  )}
                  <div style={{marginTop:10}}>
                    <button type="button" className="btn-cta btn-gap" onClick={() => saveEdit(it.id)}>Enregistrer</button>
                    <button type="button" className="btn-muted" onClick={() => { setEditing(null); setForm({ title: "", description: "", category: categories ? categories[0] : "", image: null }); }}>Annuler</button>
                  </div>
                </div>
              ) : (
                <div className="item-row">
                  <div>
                    <div className="item-title">{it.title}</div>
                    <div className="item-desc">{it.description}</div>
                    {it.category && <div className="item-desc">Catégorie: {it.category}</div>}
                    {/* show thumbnail if available (service.image, blog.featured_image, media.url) */}
                    {(it.image || it.featured_image || it.url) && (
                      <div style={{marginTop:8}}>
                        <img src={it.image || it.featured_image || it.url} alt={it.title} className="admin-thumb" />
                      </div>
                    )}
                  </div>
                  <div className="actions">
                    <button type="button" className="btn-cta btn-sm" onClick={() => startEdit(it)}>Modifier</button>
                    <button type="button" className="btn-danger btn-sm" onClick={() => deleteItem(it.id)}>Supprimer</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("users");
  const containerRef = useRef(null);

  useEffect(() => {
    // Utilisation du scroll natif; on ne démarre pas de boucle rAF pour Lenis
    return () => {};
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.fade-in');
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tab]);

  return (
    <div className="app-root" ref={containerRef}>
      <div className="fade-in"><Header /></div>
      <div className="container main-container fade-in">
        <nav className="nav-tabs admin-tabs fade-in">
          <button className={`tab-button ${tab === 'users' ? 'active' : ''}`} type="button" onClick={() => setTab('users')}>Utilisateurs</button>
          <button className={`tab-button ${tab === 'services' ? 'active' : ''}`} type="button" onClick={() => setTab('services')}>Services</button>
          <button className={`tab-button ${tab === 'gallery' ? 'active' : ''}`} type="button" onClick={() => setTab('gallery')}>Galerie</button>
          <button className={`tab-button ${tab === 'blog' ? 'active' : ''}`} type="button" onClick={() => setTab('blog')}>Blog</button>
        </nav>

        <main className="fade-in">
          {tab === 'users' && <UsersView />}
          {tab === 'services' && <ItemsListView type="Services" endpoint="/services" categories={["Immobilier", "Imprimerie", "Fourniture Informatique", "Divers"]} />}
          {tab === 'gallery' && <ItemsListView type="Galerie" endpoint="/media" />}
          {tab === 'blog' && <ItemsListView type="Blog" endpoint="/blogs" />}
        </main>
      </div>
      <div className="fade-in"><Footer /></div>
    </div>
  );
}
