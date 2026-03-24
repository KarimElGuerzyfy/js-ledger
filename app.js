//Element grabs
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const total = document.getElementById('total');
//Form
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const category = document.getElementById('category');
const addBtn = document.getElementById('add-btn');
const errorName = document.getElementById('error-name');
const errorAmount = document.getElementById('error-amount');
//Filter and List
const pills = document.querySelectorAll('.pill');
const expenseListItems = document.getElementById('expense-list-items');
const emptyState = document.getElementById('empty-state');

//variables
let expenses = JSON.parse(localStorage.getItem('ledger_expenses')) || [];
let activeFilters = new Set(['all']);

[expenseName, expenseAmount].forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addBtn.click();
        }
    });
});

addBtn.addEventListener("click", () => {
    errorAmount.classList.add('hidden');
    errorName.classList.add('hidden');

    const expName  = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (expName === "") {
        errorName.classList.remove('hidden');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        errorAmount.classList.remove('hidden');
        return;
    }

    let expense = {
    id: Date.now(),
    description: expName, 
    price: amount, 
    category: category.value
};
expenses.unshift(expense);
saveToLocal()
render();
expenseName.value = '';
expenseAmount.value = '';
category.value = 'food';
}); 

function render() {
    expenseListItems.innerHTML = '';
    
    const filtered = activeFilters.has('all') 
        ? expenses 
        : expenses.filter(e => activeFilters.has(e.category));

    filtered.forEach(expense => {
        expenseListItems.innerHTML += `
            <li class="grid grid-cols-3 items-center px-4 py-3 md:px-10 border-b border-gray-200 dark:border-gray-700">
                <p class="dark:text-gray-100 text-left truncate">${expense.description}</p>
                <p class="dark:text-gray-100 text-center">$${expense.price.toFixed(2)}</p>
                <div class="text-right">
                    <button class="dark:text-gray-100 p-0 bg-transparent border-none text-xl cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-300" data-id="${expense.id}">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </li>`;
});
    
    if (expenses.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
    updateTotal(filtered);
};

themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle('dark');
    iconSun.classList.toggle('hidden');
    iconMoon.classList.toggle('hidden');
});

expenseListItems.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    expenses = expenses.filter(expense => expense.id !== id);
    saveToLocal()
    render();
});


pills.forEach(pill => {
    pill.addEventListener('click', () => {
        const filter = pill.dataset.category;

        if (filter === 'all') {
            // If "All" is clicked, wipe everything else
            activeFilters.clear();
            activeFilters.add('all');
        } else {
            // If a specific category is clicked, remove "All"
            activeFilters.delete('all');

            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
            } else {
                activeFilters.add(filter);
            }

            // If you de-selected the last category, default back to "All"
            if (activeFilters.size === 0) {
                activeFilters.add('all');
            }
        }

        // Sync visual "active" states
        pills.forEach(p => {
            if (activeFilters.has(p.dataset.category)) {
                p.classList.add('pill-active');
            } else {
                p.classList.remove('pill-active');
            }
        });

        render();
    });
});

function updateTotal(dataToSum) {
    const list = dataToSum || [];
    const sum = list.reduce((acc, expense) => acc + expense.price, 0);
    total.textContent = `$${sum.toFixed(2)}`;
}

render()
document.querySelector('[data-category="all"]').classList.add('pill-active');

function saveToLocal() {
    localStorage.setItem('ledger_expenses', JSON.stringify(expenses));
};