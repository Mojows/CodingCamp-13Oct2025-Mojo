let tasksDB = [];  // Array untuk menyimpan semua tugas

// Fungsi untuk menambahkan tugas baru
function addtask() {
    const taskinput = document.getElementById("todo-input");
    const taskdate = document.getElementById("due-date");

    console.log(taskinput.value);
    console.log(taskdate.value);

    if (validateinput(taskinput.value, taskdate.value)) {
        const newtask = {
            task: taskinput.value,
            date: taskdate.value,
        };

        tasksDB.push(newtask);
        renderTask(tasksDB);  // Render ulang dengan array asli
        taskinput.value = "";  // Kosongkan input setelah menambahkan
        taskdate.value = "";   // Kosongkan date input
    }
}

// Fungsi untuk merender tugas (sekarang menerima array sebagai parameter)
function renderTask(tasks = tasksDB) {
    const tasklist = document.getElementById("task-list");
    tasklist.innerHTML = "";  // Kosongkan tabel terlebih dahulu

    if (tasks.length === 0) {
        tasklist.innerHTML = '<tr><td colspan="3" class="text-center">No task added yet</td></tr>';
        return;
    }

    tasks.forEach((task, index) => {
        // Gunakan indeks dari array yang diberikan, bukan tasksDB asli
        tasklist.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${task.task}</td>
                <td>${task.date}</td>
                <td><button onclick="deletetask(${index}, 'tasksDB')">Delete</button></td>
            </tr>
        `;
    });
}

// Fungsi untuk menghapus semua tugas
function deleteAllTasks() {
    tasksDB = [];  // Kosongkan array
    renderTask();  // Render ulang
}

// Fungsi untuk filter tugas (gabungkan dengan filter bulan)
function filtertask() {
    const filterText = document.getElementById("filter-task").value.toLowerCase();
    const selectedMonth = document.getElementById("filter-month").value;  // Format: YYYY-MM

    console.log("Filter text:", filterText);
    console.log("Selected month:", selectedMonth);

    if (!tasksDB || tasksDB.length === 0) {
        renderTask([]);  // Render array kosong
        return;
    }

    const filteredTasks = tasksDB.filter(task => {
        const matchesTask = task.task.toLowerCase().includes(filterText);
        const matchesMonth = selectedMonth ? task.date.slice(0, 7) === selectedMonth : true;  // Periksa bulan jika dipilih
        return matchesTask && matchesMonth;
    });

    console.log("Filtered tasks:", filteredTasks);
    renderTask(filteredTasks);  // Render array yang difilter
}

// Fungsi untuk menghapus tugas berdasarkan indeks (dari array yang dirender)
function deletetask(index, arrayName) {
    if (arrayName === 'tasksDB') {  // Hanya hapus dari tasksDB asli
        if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
            tasksDB.splice(index, 1);  // Hapus elemen dari array
            renderTask(tasksDB);  // Render ulang array asli
        }
    } else {
        console.error("Array tidak valid untuk penghapusan.");
    }
}

// Fungsi untuk validasi input
function validateinput(task, date) {
    if (task.trim() === "" || date.trim() === "") {
        alert("Please enter both task and due date.");
        return false;
    }
    return true;
}

// Opsional: Jika Anda ingin fungsi terpisah untuk filter bulan, gunakan ini
// function filterByMonth() {
//     const selectedMonth = document.getElementById("filter-month").value;
//     const filteredTasks = tasksDB.filter(task => task.date.slice(0, 7) === selectedMonth);
//     renderTask(filteredTasks);
// }
