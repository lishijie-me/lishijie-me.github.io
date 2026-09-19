import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllPosts } from '../lib/posts';

const PAGE_SIZE = 6; // 每页显示几篇

// 生成带省略号的页码数组
function getPageNumbers(current, total) {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i);
        }
    }

    for (const i of range) {
        if (last) {
            if (i - last === 2) {
                rangeWithDots.push(last + 1);
            } else if (i - last > 2) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        last = i;
    }

    return rangeWithDots;
}

export default function Home() {
    const posts = getAllPosts();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

    const currentPage = Math.min(
        Math.max(1, isNaN(pageParam) ? 1 : pageParam),
        totalPages
    );

    const start = (currentPage - 1) * PAGE_SIZE;
    const currentPosts = posts.slice(start, start + PAGE_SIZE);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setSearchParams({ page: String(page) });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [currentPage]);

    return (
        <div>
            {/*<div className="home-header">*/}
            {/*    /!*<h1>文章列表</h1>*!/*/}
            {/*    <span className="post-count">共 {posts.length} 篇</span>*/}
            {/*</div>*/}

            {posts.length === 0 ? (
                <p>还没有文章，去 src/posts 新建 .md 文件吧。</p>
            ) : (
                <>
                    {/* 极简文章列表 */}
                    <div className="post-list-plain">
                        {currentPosts.map((post) => (
                            <article key={post.slug} className="post-item">
                                <h2 className="post-title">
                                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                </h2>

                                <div className="post-meta">
                                    {post.date && <span className="post-date">{post.date}</span>}
                                    {post.tags && post.tags.length > 0 && (
                                        <span className="post-tags">
                      {post.tags.map((t) => (
                          <span key={t} className="tag">#{t}</span>
                      ))}
                    </span>
                                    )}
                                </div>

                                {post.description && (
                                    <p className="post-excerpt">{post.description}</p>
                                )}
                            </article>
                        ))}
                    </div>

                    {/* 分页（保持原样） */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ← 上一页
                            </button>

                            <div className="page-numbers">
                                {getPageNumbers(currentPage, totalPages).map((page, index) =>
                                        page === '...' ? (
                                            <span key={`dots-${index}`} className="page-dots">
                      …
                    </span>
                                        ) : (
                                            <button
                                                key={page}
                                                className={`page-num ${
                                                    page === currentPage ? 'active' : ''
                                                }`}
                                                onClick={() => goToPage(page)}
                                            >
                                                {page}
                                            </button>
                                        )
                                )}
                            </div>

                            <button
                                className="page-btn"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                下一页 →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}