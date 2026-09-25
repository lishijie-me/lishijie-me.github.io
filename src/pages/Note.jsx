import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { getPostBySlug } from '../lib/posts';

export default function Note() {
    const { slug } = useParams();
    const note = getPostBySlug(slug);

    if (!note || note.category !== 'notes') {
        return (
            <div>
                <h1>随笔不存在</h1>
                <Link to="/notes">返回随笔列表</Link>
            </div>
        );
    }

    return (
        <article className="note-detail">
            <header className="note-detail-header">
                <div className="note-detail-date">{note.date}</div>
                <h1 className="note-detail-title">{note.title}</h1>
            </header>

            <div className="markdown-body">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeSlug, rehypeKatex, rehypeHighlight]}
                >
                    {note.content}
                </ReactMarkdown>
            </div>

            <p className="back">
                <Link to="/notes">← 返回随笔</Link>
            </p>
        </article>
    );
}