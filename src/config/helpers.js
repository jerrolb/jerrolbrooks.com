export const resetMenus = () => {
    const allMenuItems = document.getElementsByClassName('ant-menu-item');
    const active = document.getElementsByClassName('ant-menu-item-active');
    const selected = document.getElementsByClassName('ant-menu-item-selected');

    if (selected.length) {
        Object.values(allMenuItems).forEach((item) => {
            if (item.style.backgroundColor !== '#fff') {
                item.style.backgroundColor = '#fff';
            }
            if (item.children[0].style.color !== 'rgba(0, 0, 0, 0.65)') {
                item.children[0].style.color = 'rgba(0, 0, 0, 0.65)';
            }
        });

        active[0].style.backgroundColor = '#e6f7ff';
        active[0].children[0].style.color = '#1890ff';
    }
};
