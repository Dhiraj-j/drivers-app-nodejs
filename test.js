const data = [
    {
        "menu_category": {
            "name": "South Indian",
            "id": 3
        },
        "name": "samhar vada",
        "description": "description",
        "price": "99",
        "thumbnail": "thumbnail url",
        "gallery": [
            "url",
            "url"
        ],
        "preferences": "VEG",
        "available": true,
    },
    {
        "menu_category": {
            "name": "South Indian",
            "id": 3
        },
        "name": "samhar vada 3",
        "description": "description",
        "price": "99",
        "thumbnail": "thumbnail url",
        "gallery": [
            "url",
            "url"
        ],
        "preferences": "VEG",
        "available": true,
    },
    {
        "menu_category": {
            "name": "North Indian",
            "id": 3
        },
        "name": "idli vada",
        "description": "description",
        "price": "99",
        "thumbnail": "thumbnail url",
        "gallery": [
            "url",
            "url"
        ],
        "preferences": "VEG",
        "available": true,
    }
]

const groupedMenuItems = {};

// Iterate through the menu items and group them by category name
data.forEach(menu_item => {
    const categoryName = menu_item.menu_category.name;
    if (!groupedMenuItems[categoryName]) {
        groupedMenuItems[categoryName] = [];
    }
    groupedMenuItems[categoryName].push(menu_item);
});

console.log(groupedMenuItems)