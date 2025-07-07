document.addEventListener("DOMContentLoaded", () => {
    //this code below is for deletion on book-cards
    const deleteForms = document.querySelectorAll("form[action^='/book-notes/delete']");
    deleteForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            const confirmed = confirm("Are you sure to delete this book?");
            if(!confirmed) {
                e.preventDefault();
            }
        });
    });

    //this code below is for sorting
    const container = document.querySelector(".grid");``
    const sortBtn = document.querySelectorAll(".sort-btn");
    const bookCards = Array.from(document.querySelectorAll(".book-card"))

    const sortState = {
        title: "asc",
        rating: "desc"
    }

    const sortIcon = {
        asc: "↑",
        desc: "↓"
    }

    sortBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const sortType = e.target.dataset.sort;
            const direction = sortState[sortType];
            let sorted = [...bookCards];

            if(sortType === "title") {
                sorted = bookCards.sort((a, b) => {
                    return direction === "asc" ?
                           a.dataset.title.localeCompare(b.dataset.title) :
                           b.dataset.title.localeCompare(a.dataset.title);
                });
            }else if(sortType === "rating") {
                sorted = bookCards.sort((a, b) => {
                    return direction === "asc" ?
                           Number(b.dataset.rating) - Number(a.dataset.rating) :
                           Number(a.dataset.rating) - Number(b.dataset.rating);
                });
            }

            sortState[sortType] = direction === "asc" ? "desc" : "asc";

            sortBtn.forEach(btn => {
                const type = btn.dataset.sort;
                const icon = type === sortType ? sortIcon[sortState[type]] : "";
                btn.textContent = `Sort by ${capitalize(type)} ${icon}`;

                if(type === sortType) {
                    btn.classList.add("bg-gray-400", "text-white");
                    btn.classList.remove("bg-gray-300");
                }else{
                    btn.classList.remove("bg-gray-400", "text-white");
                    btn.classList.add("bg-gray-300");
                }
            });

            container.innerHTML = "";
            sorted.forEach(card => {
                container.appendChild(card);
            });
        });
    });

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
});