import { Link } from 'react-router-dom';
import { getAllNotes } from '../lib/posts';

export default function Notes() {
    const notes = getAllNotes();

    return (
        <div>
            <h1 className="notes-page-title">随笔</h1>
            <p className="notes-page-sub">记录一些日常的碎碎念</p>

            {notes.length === 0 ? (
                <p>还没有随笔，去 src/posts/notes/ 新建 .md 文件吧。</p>
            ) : (
                <div className="timeline">
                    {notes.map((note) => (
                        <div key={note.slug} className="timeline-item">
                            <div className="timeline-dot" />
                            <div className="timeline-date">{note.date}</div>
                            <h2 className="timeline-title">
                                <Link to={`/notes/${note.slug}`}>{note.title}</Link>
                            </h2>
                            {note.description && (
                                <p className="timeline-excerpt">{note.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}