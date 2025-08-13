import React, { useState } from 'react';
import { useProjects } from '../contexts/ProjectsContext';
import { usePosts } from '../contexts/PostsContext';
import { useAuth } from '../contexts/AuthContext';
import { Project, Post } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, RotateCcw, FolderKanban, FileText, Settings, ChevronDown, LogOut, Trash2, Link as LinkIcon } from 'lucide-react';

const FormInput: React.FC<any> = ({ label, name, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-subtle mb-1">{label}</label>
        <input id={name} name={name} {...props} className="w-full bg-overlay rounded-md border-transparent text-text-primary p-2 focus:ring-2 focus:ring-accent focus:border-transparent" />
    </div>
);

const FormTextarea: React.FC<any> = ({ label, name, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-subtle mb-1">{label}</label>
        <textarea id={name} name={name} {...props} className="w-full bg-overlay rounded-md border-transparent text-text-primary p-2 focus:ring-2 focus:ring-accent focus:border-transparent"></textarea>
    </div>
);


const SettingsPanel = () => {
    const { changePassword } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (newPassword !== confirmNewPassword) {
            setMessage({ type: 'error', text: '新しいパスワードが一致しません。' });
            return;
        }
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: '新しいパスワードは6文字以上で設定してください。' });
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            setMessage({ type: 'success', text: 'パスワードが正常に変更されました。' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'パスワードの変更中にエラーが発生しました。' });
        }
    };
    
    return (
        <div className="space-y-12">
            <div className="bg-surface p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">パスワードの変更</h2>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                    <FormInput label="現在のパスワード" name="currentPassword" type="password" value={currentPassword} onChange={(e: any) => setCurrentPassword(e.target.value)} required />
                    <FormInput label="新しいパスワード" name="newPassword" type="password" value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} required />
                    <FormInput label="新しいパスワード (確認)" name="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e: any) => setConfirmNewPassword(e.target.value)} required />
                    
                    {message && (
                        <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-500'}`}>{message.text}</p>
                    )}
                    
                    <div className="flex justify-end pt-2">
                        <button type="submit" className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent-hover transition-colors">パスワードを変更</button>
                    </div>
                </form>
            </div>

            <div className="bg-surface p-8 rounded-lg shadow-xl">
                <button onClick={() => setIsAccordionOpen(!isAccordionOpen)} className="w-full flex justify-between items-center text-left">
                    <h2 className="text-2xl font-bold text-white">変更を公開する方法</h2>
                    <ChevronDown size={28} className={`text-subtle transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isAccordionOpen && (
                        <motion.div 
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: 'auto', marginTop: '24px' },
                                collapsed: { opacity: 0, height: 0, marginTop: '0px' },
                            }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="prose prose-invert prose-p:text-subtle prose-li:text-subtle prose-strong:text-white max-w-none text-subtle">
                                <ol className="list-decimal list-inside space-y-4">
                                    <li>
                                        <strong>コンテンツの編集:</strong>
                                        <p className="mt-1 pl-2">「プロジェクト管理」「ブログ管理」タブを使って、コンテンツの追加、編集、削除を行います。変更内容は自動的にこのブラウザのローカルストレージに保存されます。</p>
                                    </li>
                                    <li>
                                        <strong>ブラウザからデータをエクスポート:</strong>
                                        <p className="mt-1 pl-2"><code>F12</code>キーを押すか右クリックして「検証」を選択し、開発者ツールを開きます。「Application」タブ（Firefoxの場合は「ストレージ」タブ）に移動し、「ローカルストレージ」セクションでこのサイトのURLを見つけます。<code>portfolio_projects</code>と<code>portfolio_posts</code>という2つのキーが表示されるので、それぞれの値をコピーします。</p>
                                    </li>
                                    <li>
                                        <strong>ソースコードの更新:</strong>
                                        <p className="mt-1 pl-2">コードエディタを開き、コピーしたデータを対応するファイルに貼り付けます。<br/>
                                        - <code>portfolio_projects</code>の値は <code>src/data/projects.ts</code> に貼り付けます。<br/>
                                        - <code>portfolio_posts</code>の値は <code>src/data/posts.ts</code> に貼り付けます。<br/>
                                        各ファイルの中身（配列全体）を置き換えるようにしてください。</p>
                                    </li>
                                    <li>
                                        <strong>GitHub Pagesへデプロイ:</strong>
                                        <p className="mt-1 pl-2">変更したファイルをGitHubリポジトリにコミットし、プッシュします。GitHub Actionsが自動的にサイトをビルドし、更新内容をデプロイします。これで、すべての訪問者に変更が公開されます。</p>
                                    </li>
                                </ol>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};


const AdminPage: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'posts' | 'settings'>('projects');
  
  // Projects State
  const { projects, updateProject, addProject, resetProjects, deleteProject } = useProjects();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Posts State
  const { posts, updatePost, addPost, resetPosts, deletePost } = usePosts();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  // --- Project Handlers ---
  const handleEditProject = (project: Project) => {
    setEditingProject({ 
      ...project, 
      tags: Array.isArray(project.tags) ? project.tags : [],
      links: Array.isArray(project.links) ? project.links : [],
    });
    setIsNewProject(false);
  };
  
  const handleAddNewProject = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      imageUrl: 'https://picsum.photos/seed/new-project/600/400',
      tags: [],
      links: [],
    });
    setIsNewProject(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      const projectToSave = {
        ...editingProject,
        tags: Array.isArray(editingProject.tags) ? editingProject.tags : String(editingProject.tags).split(',').map(tag => tag.trim()).filter(Boolean)
      };
      if (isNewProject) { addProject(projectToSave); } 
      else { updateProject(projectToSave); }
      setEditingProject(null);
      setIsNewProject(false);
    }
  };
  
  const handleChangeProject = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingProject) {
      const { name, value } = e.target;
      if (name === 'tags') {
        setEditingProject({ ...editingProject, tags: value.split(',').map(tag => tag.trim()) });
      } else {
        setEditingProject({ ...editingProject, [name]: value });
      }
    }
  };

  const handleLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    if (editingProject) {
        const newLinks = [...editingProject.links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setEditingProject({ ...editingProject, links: newLinks });
    }
  };

  const handleAddLink = () => {
    if (editingProject) {
        const newLinks = [...editingProject.links, { label: '', url: '' }];
        setEditingProject({ ...editingProject, links: newLinks });
    }
  };

  const handleRemoveLink = (index: number) => {
    if (editingProject) {
        const newLinks = editingProject.links.filter((_, i) => i !== index);
        setEditingProject({ ...editingProject, links: newLinks });
    }
  };

  // --- Post Handlers ---
  const handleEditPost = (post: Post) => {
    setEditingPost({ ...post });
    setIsNewPost(false);
  };

  const handleAddNewPost = () => {
    const today = new Date().toISOString().split('T')[0];
    setEditingPost({
      id: `post-${Date.now()}`,
      title: '',
      date: today,
      excerpt: '',
      content: ''
    });
    setIsNewPost(true);
  };
  
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      if (isNewPost) { addPost(editingPost); }
      else { updatePost(editingPost); }
      setEditingPost(null);
      setIsNewPost(false);
    }
  };
  
  const handleChangePost = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingPost) {
      setEditingPost({ ...editingPost, [e.target.name]: e.target.value });
    }
  };
  
  const TabButton: React.FC<{
    tabName: 'projects' | 'posts' | 'settings';
    Icon: React.ElementType;
    label: string;
  }> = ({ tabName, Icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors duration-200 ${
        activeTab === tabName
          ? 'text-accent border-accent'
          : 'text-text-secondary border-transparent hover:text-white'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <header className="flex justify-between items-center mb-8 pb-4">
        <h1 className="text-4xl font-bold text-white">管理パネル</h1>
        <button 
          onClick={logout}
          className="bg-surface text-text-secondary font-bold py-2 px-4 rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-300 flex items-center gap-2"
        >
          <LogOut size={20} /> ログアウト
        </button>
      </header>
      
      <div className="flex border-b-2 border-surface mb-8">
        <TabButton tabName="projects" Icon={FolderKanban} label="プロジェクト管理" />
        <TabButton tabName="posts" Icon={FileText} label="ブログ管理" />
        <TabButton tabName="settings" Icon={Settings} label="設定" />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'projects' && (
          <motion.div key="projects" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
             <div className="flex justify-end gap-4 mb-8">
              <button onClick={handleAddNewProject} className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors duration-300 flex items-center gap-2">
                  <Plus size={20} /> 新規プロジェクトを追加
              </button>
              <button onClick={resetProjects} className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2">
                  <RotateCcw size={20} /> プロジェクトをリセット
              </button>
            </div>
            {editingProject ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-surface p-8 rounded-lg shadow-xl mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{isNewProject ? '新規プロジェクトを追加' : 'プロジェクトを編集'}</h2>
                <form onSubmit={handleSaveProject} className="space-y-6">
                   <FormInput label="タイトル" name="title" type="text" value={editingProject.title} onChange={handleChangeProject} required />
                   <FormTextarea label="説明 (Markdown対応)" name="description" value={editingProject.description} onChange={handleChangeProject} required rows={6} />
                   <FormInput label="画像URL" name="imageUrl" type="text" value={editingProject.imageUrl} onChange={handleChangeProject} required />
                   <FormInput label="タグ (カンマ区切り)" name="tags" type="text" value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : ''} onChange={handleChangeProject} />
                  
                  {/* Links Editor */}
                  <div>
                    <h3 className="text-lg font-medium text-subtle mb-2">関連リンク</h3>
                    <div className="space-y-4">
                      {editingProject.links.map((link, index) => (
                        <div key={index} className="flex items-end gap-4 p-4 bg-overlay rounded-md">
                          <div className="flex-grow">
                            <FormInput label={`リンク名 ${index + 1}`} name={`linkLabel-${index}`} type="text" value={link.label} onChange={(e:any) => handleLinkChange(index, 'label', e.target.value)} placeholder="例: Source Code" />
                          </div>
                          <div className="flex-grow">
                            <FormInput label={`URL ${index + 1}`} name={`linkUrl-${index}`} type="url" value={link.url} onChange={(e:any) => handleLinkChange(index, 'url', e.target.value)} placeholder="https://..." />
                          </div>
                          <button type="button" onClick={() => handleRemoveLink(index)} className="bg-red-600 text-white p-2 rounded-md hover:bg-red-500 transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={handleAddLink} className="mt-4 bg-accent/20 text-accent font-semibold py-2 px-4 rounded-md hover:bg-accent/40 transition-colors flex items-center gap-2">
                      <LinkIcon size={18} /> リンクを追加
                    </button>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => setEditingProject(null)} className="bg-overlay text-text-primary font-bold py-2 px-4 rounded-lg hover:bg-muted transition-colors">キャンセル</button>
                    <button type="submit" className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors">プロジェクトを保存</button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-surface rounded-lg p-4 shadow-md flex flex-col justify-between">
                    <div>
                      <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
                      <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-text-secondary flex-grow mb-4">{project.description.substring(0, 100)}...</p>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => handleEditProject(project)} className="flex-grow bg-overlay text-text-primary font-semibold py-2 px-4 rounded-md hover:bg-muted transition-colors duration-200 flex items-center justify-center gap-2">
                        <Edit size={16} /> 編集
                      </button>
                      <button onClick={() => deleteProject(project.id)} className="bg-red-900/50 text-red-300 p-2 rounded-md hover:bg-red-900/80 transition-colors duration-200">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
        {activeTab === 'posts' && (
           <motion.div key="posts" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="flex justify-end gap-4 mb-8">
                <button onClick={handleAddNewPost} className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors duration-300 flex items-center gap-2">
                    <Plus size={20} /> 新規投稿を追加
                </button>
                <button onClick={resetPosts} className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2">
                    <RotateCcw size={20} /> 投稿をリセット
                </button>
            </div>
            {editingPost ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-surface p-8 rounded-lg shadow-xl mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{isNewPost ? '新規投稿を追加' : '投稿を編集'}</h2>
                <form onSubmit={handleSavePost} className="space-y-6">
                  <FormInput label="タイトル" name="title" type="text" value={editingPost.title} onChange={handleChangePost} required />
                  <FormInput label="日付" name="date" type="date" value={editingPost.date} onChange={handleChangePost} required />
                  <FormTextarea label="抜粋" name="excerpt" value={editingPost.excerpt} onChange={handleChangePost} required rows={3} />
                  <FormTextarea label="内容 (Markdown)" name="content" value={editingPost.content} onChange={handleChangePost} required rows={15} />
                  <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => setEditingPost(null)} className="bg-overlay text-text-primary font-bold py-2 px-4 rounded-lg hover:bg-muted transition-colors">キャンセル</button>
                    <button type="submit" className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors">投稿を保存</button>
                  </div>
                </form>
              </motion.div>
            ) : (
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-surface rounded-lg p-4 shadow-md flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h3 className="font-bold text-lg text-white">{post.title}</h3>
                                <p className="text-sm text-text-secondary">{post.date}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditPost(post)} className="bg-overlay text-text-primary font-semibold py-2 px-4 rounded-md hover:bg-muted transition-colors duration-200 flex items-center justify-center gap-2">
                                    <Edit size={16} /> 編集
                                </button>
                                <button onClick={() => deletePost(post.id)} className="bg-red-900/50 text-red-300 p-2 rounded-md hover:bg-red-900/80 transition-colors duration-200">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </motion.div>
        )}
        {activeTab === 'settings' && (
           <motion.div key="settings" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <SettingsPanel />
           </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Mock lucide-react icons if not present
if (typeof Plus === 'undefined') {
    (window as any).Plus = () => <svg/>;
    (window as any).Edit = () => <svg/>;
    (window as any).RotateCcw = () => <svg/>;
    (window as any).FolderKanban = () => <svg/>;
    (window as any).FileText = () => <svg/>;
    (window as any).Settings = () => <svg/>;
    (window as any).ChevronDown = () => <svg/>;
    (window as any).LogOut = () => <svg/>;
    (window as any).Trash2 = () => <svg/>;
    (window as any).LinkIcon = () => <svg/>;
}

export default AdminPage;