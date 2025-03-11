/*
 * Copyright (c) 2017-2025 null. All rights reserved.
 */

/**
 * script.js
 *
 * @author null
 * @date 2025-03-11
 * @link <a href="https://github.com/dkbnull/hello-note-static">GitHub</a>
 */
document.addEventListener('DOMContentLoaded', function () {
    // 加载页头
    fetch('/templates/header.html')
        .then(response => response.text())
        .then(html => {
            const headerPlaceholder = document.createElement('div');
            headerPlaceholder.innerHTML = html;
            document.body.prepend(headerPlaceholder);

            // 高亮当前页面菜单
            const currentPath = window.location.pathname;
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });

    // 加载页脚
    fetch('/templates/footer.html')
        .then(response => response.text())
        .then(html => {
            const footerPlaceholder = document.createElement('div');
            footerPlaceholder.innerHTML = html;
            document.body.append(footerPlaceholder);
        });
});
