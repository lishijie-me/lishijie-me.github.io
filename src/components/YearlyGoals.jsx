import { useState } from 'react';

// ==== 自动计算百日挑战进度的函数 ====
function getChallengeProgress(startDate, totalDays) {
    const start = new Date(startDate);
    const today = new Date();
    // 去掉时分秒，只算整天
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today - start;
    // +1 表示第一天也算。如果还没开始，则是 0
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const currentDay = Math.min(Math.max(diffDays, 0), totalDays); // 限制在 0~100 之间
    const percent = Math.round((currentDay / totalDays) * 100);
    return { currentDay, percent };
}

// ==== 数据区：你只需要改这里 ====
const GOALS_DATA = {
    2026: {
        status: '进行中',
        goals: [
            { id: 1, icon: '📚', title: '读完 1 本技术/非技术书籍', target: '目标：每月至少 1 本，涵盖架构、产品、人文', progress: '✅ 已完成 0 本·《设计模式》等', checked: false },
            { id: 2, icon: '📝', title: '输出 10 篇技术文章/笔记', target: '目标：平均每周 1 篇，沉淀知识体系', progress: '✅ 已完成 0 篇·持续输出中', checked: false },
            // { id: 3, icon: '💻', title: '完成 3 个个人开源项目', target: '目标：至少 1 个项目获得 100+ Star', progress: '✅ 已完成 2 个，第 3 个正在规划中', checked: false },
            // { id: 4, icon: '🏃', title: '坚持运动，全年跑步 500 公里', target: '目标：每周 2-3 次，保持身体健康', progress: '✅ 已完成 380 公里·距离目标还有 120 公里 💪', checked: false },
            // { id: 5, icon: '✈️', title: '去 2 个新的城市旅行', target: '目标：拓宽视野，感受不同地域文化', progress: '✅ 已完成 1 个（成都），下一个计划去大理', checked: false },

            // 👇 这里是新增的百日挑战。只需要改这里 👇
            {
                id: 6,
                icon: '🔥',
                title: '百日挑战：连续 100 天',
                target: '目标：每天不间断',
                startDate: '2026-09-20',  // 填写你的开始日期
                totalDays: 100,           // 挑战总天数
                checked: false
            }
            // 👆 新增结束 👆
        ],
        summary: {
            text: '整体启动，技术输出和读书计划正在进行。',
            footer: '🔥 当前完成度：0/3·继续加油！'
        }
    },
    2025: {
        status: '已完成',
        goals: [
            { id: 1, icon: '📚', title: '读完 10 本书', target: '目标：保持阅读习惯', progress: '✅ 已完成 10 本', checked: true },
        ],
        summary: {
            text: '2025 年目标全部达成，2026 年继续加油。',
            footer: '🎉 完成度：1/1·完美收官！'
        }
    }
};

const YEARS = ['2026', '2025'];

export default function YearlyGoals() {
    const [activeYear, setActiveYear] = useState('2026');
    const currentData = GOALS_DATA[activeYear];

    return (
        <div className="yearly-goals">
            <div className="goals-header">
                <span className="goals-icon">🎯</span>
                <h2>年度目标</h2>
            </div>

            {/* 年份切换 tabs */}
            <div className="goals-tabs">
                {YEARS.map((year) => (
                    <button
                        key={year}
                        className={`goals-tab ${activeYear === year ? 'active' : ''}`}
                        onClick={() => setActiveYear(year)}
                    >
                        {year}
                        <span className="tab-status">{GOALS_DATA[year].status}</span>
                    </button>
                ))}
            </div>

            {/* 目标列表 */}
            <div className="goals-list">
                {currentData.goals.map((goal) => (
                    <div key={goal.id} className="goal-item">
                        <div className={`goal-check ${goal.checked ? 'checked' : ''}`}>
                            {goal.checked ? '☑' : '☐'}
                        </div>
                        <div className="goal-content">
                            <div className="goal-title">
                                <span className="goal-emoji">{goal.icon}</span>
                                {goal.title}
                            </div>
                            <div className="goal-target">{goal.target}</div>

                            {/* 普通目标：显示文字进度 */}
                            {goal.progress && (
                                <div className="goal-progress">{goal.progress}</div>
                            )}

                            {/* 百日挑战：显示动态进度条 */}
                            {goal.startDate && (
                                (() => {
                                    const { currentDay, percent } = getChallengeProgress(goal.startDate, goal.totalDays);
                                    return (
                                        <div className="goal-challenge">
                                            <div className="challenge-text">
                                                🔥 第 {currentDay} / {goal.totalDays} 天（{percent}%）
                                            </div>
                                            <div className="challenge-bar">
                                                <div className="challenge-fill" style={{ width: `${percent}%` }}></div>
                                            </div>
                                        </div>
                                    );
                                })()
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 年度总结 */}
            <div className="goals-summary">
                <div className="summary-title">📋 年度总结：</div>
                <div className="summary-text">{currentData.summary.text}</div>
                <div className="summary-footer">{currentData.summary.footer}</div>
            </div>
        </div>
    );
}