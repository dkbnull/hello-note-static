/*
 * Copyright (c) 2017-2025 null. All rights reserved.
 */

/**
 * directory.js
 *
 * @author null
 * @date 2025-03-11
 * @link <a href="https://github.com/dkbnull/hello-note-static">GitHub</a>
 */
// 动态加载目录数据
let directoryData = null;

function loadDirectoryData() {
    return fetch('/hello-note-static/directory.json')
        .then(response => response.json())
        .then(data => {
            directoryData = data;
        })
        .catch(error => {
            console.error('加载目录数据失败:', error);
        });
}

// 初始化时加载数据并生成目录
document.addEventListener('DOMContentLoaded', () => {
    loadDirectoryData().then(() => {
        const container = document.getElementById('directory-tree');
        if (container && directoryData) {
            const tree = generateDirectoryTree(directoryData);
            container.appendChild(tree);

            initCollapseState();
            generateArticleList().then();
        }
    });
});

// 生成目录树（不含路径传递）
function generateDirectoryTree(data) {
    const ul = document.createElement('ul');
    ul.classList.add('directory-list');

    data.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('directory-item');
        li.dataset.path = item.name;

        // 图标和名称生成
        const icon = document.createElement('span');
        icon.classList.add('icon');

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('name');
        nameSpan.textContent = item.name;
        nameSpan.classList.add('folder');
        nameSpan.addEventListener('click', () => {
            const path = li.dataset.path;

            localStorage.setItem('directory', path);

            initCollapseState();
            generateArticleList().then();
        });

        li.appendChild(icon);
        li.appendChild(nameSpan);
        ul.appendChild(li);
    });

    return ul;
}

// 初始化目录状态
function initCollapseState() {
    document.querySelectorAll('.directory-item').forEach(li => {
        const path = li.dataset.path;
        if (localStorage.getItem('directory') === path) {
            li.classList.add('collapsed');
        } else {
            li.classList.remove('collapsed');
        }
    });
}

// 动态生成文章列表
async function generateArticleList() {
    const directory = localStorage.getItem('directory');
    // 配置目录文件路径
    let DIRECTORY_PATH;
    if (directory !== null) {
        DIRECTORY_PATH = `./hello-note-static/${encodeURIComponent(directory)}/directory.json`;
    } else {
        DIRECTORY_PATH = './hello-note-static/directory.json';
    }

    const container = document.getElementById('article-list');

    try {
        // 1. 加载目录数据
        const response = await fetch(DIRECTORY_PATH);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // 2. 清空加载提示
        container.innerHTML = '';

        // 3. 生成文章卡片
        data.children.forEach(article => {
            const articleEl = createArticleCard(article);
            container.appendChild(articleEl);
        });
    } catch (error) {
        // 错误处理
        console.error('加载文章列表失败:', error);
        container.innerHTML = `
            <div class="article-card" style="background: #ffeef0;">
                <h3>内容加载失败</h3>
                <p>错误信息：${error.message}</p>
                <button onclick="location.reload()">点击重试</button>
            </div>
        `;
    }
}

// 创建单个文章卡片
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';

    card.innerHTML = `
        <h2 class="article-title">
            <a href="${article.path}">${article.name}</a>
        </h2>
        ${article.date ? `<p class="article-date">📅 ${article.date}</p>` : ''}
        ${article.summary ? `<p class="article-summary">${article.summary}</p>` : ''}
    `;

    return card;
}