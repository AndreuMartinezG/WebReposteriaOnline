document.addEventListener('DOMContentLoaded', (event) => {
    fetchData();
    console.log("DOM Loaded")
})

const fetchData = async () => {
    try {
        const res = await fetch('/js/db.json');
        const data = await res.json();
        console.log(data)
    } catch (error) {
        console.log(error);
    }
};