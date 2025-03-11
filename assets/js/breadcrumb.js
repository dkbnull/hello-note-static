/*
 * Copyright (c) 2017-2025 null. All rights reserved.
 */

/**
 * breadcrumb.js
 *
 * @author null
 * @date 2025-03-11
 * @link <a href="https://github.com/dkbnull/hello-note-static">GitHub</a>
 */
function generateBreadcrumb() {
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    if (!breadcrumbContainer) return;

    const path = window.location.pathname;

    // 拆分路径并解码
    const segments = path.split('/')
        .filter(p => p && p !== 'index.html')
        .map(segment => decodeURIComponent(segment)); // 解码

    let breadcrumbHtml = '<a href="./">首页</a>';
    let accumulatedPath = '';

    segments.forEach((segment, index) => {
        const isLast = index === segments.length - 1;
        accumulatedPath += `./${encodeURIComponent(segment)}`; // 重新编码路径

        const name = segment.replace(/.html$/, '');
        const friendlyNames = {
            posts: '文章',
            about: '关于'
        };
        const displayName = friendlyNames[name] || name;

        breadcrumbHtml += `
            <span class="separator">/</span>
            ${isLast ?
            `<span class="current">${displayName}</span>` :
            `<a href="${accumulatedPath}">${displayName}</a>`
        }
        `;
    });

    breadcrumbContainer.innerHTML = `<div class="breadcrumb">${breadcrumbHtml}</div>`;
}

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', generateBreadcrumb);
