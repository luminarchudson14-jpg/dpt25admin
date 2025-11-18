document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('marksForm');
  const output = document.getElementById('output');

  // Load saved entries from localStorage
  let entries = JSON.parse(localStorage.getItem('marksEntries')) || [];
  let editIndex = null; // Tracks which entry is being edited

  function renderEntries() {
    output.innerHTML = '';
    entries.forEach((entry, index) => {
      const p = document.createElement('p');
      p.textContent = `Adm: ${entry.admNo} | Name: ${entry.name} | Subject: ${entry.subject} | Marks: ${entry.marks}`;

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.style.marginLeft = '10px';
      editBtn.onclick = () => {
        // Fill the form with the entry to edit
        document.getElementById('admNo').value = entry.admNo;
        document.getElementById('name').value = entry.name;
        document.getElementById('subject').value = entry.subject;
        document.getElementById('marks').value = entry.marks;
        editIndex = index;
      };

      // Delete button
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.style.marginLeft = '5px';
      delBtn.onclick = () => {
        entries.splice(index, 1);
        saveAndRender();
      };

      p.appendChild(editBtn);
      p.appendChild(delBtn);
      output.appendChild(p);
    });
  }

  function saveAndRender() {
    localStorage.setItem('marksEntries', JSON.stringify(entries));
    renderEntries();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const admNo = document.getElementById('admNo').value;
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const marks = document.getElementById('marks').value;

    if (editIndex !== null) {
      // Update existing entry
      entries[editIndex] = { admNo, name, subject, marks };
      editIndex = null;
    } else {
      // Add new entry
      entries.push({ admNo, name, subject, marks });
    }

    saveAndRender();
    form.reset();
  });

  renderEntries();
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('marksForm');
  const output = document.getElementById('output');
  const averagesDiv = document.getElementById('averages');

  let entries = JSON.parse(localStorage.getItem('marksEntries')) || [];
  let editIndex = null;

  function renderEntries() {
    output.innerHTML = '';
    entries.forEach((entry, index) => {
      const p = document.createElement('p');
      p.textContent = `Adm: ${entry.admNo} | Name: ${entry.name} | Subject: ${entry.subject} | Marks: ${entry.marks}`;

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.style.marginLeft = '10px';
      editBtn.onclick = () => {
        document.getElementById('admNo').value = entry.admNo;
        document.getElementById('name').value = entry.name;
        document.getElementById('subject').value = entry.subject;
        document.getElementById('marks').value = entry.marks;
        editIndex = index;
      };

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.style.marginLeft = '5px';
      delBtn.onclick = () => {
        entries.splice(index, 1);
        saveAndRender();
      };

      p.appendChild(editBtn);
      p.appendChild(delBtn);
      output.appendChild(p);
    });

    calculateAverages();
  }

  function saveAndRender() {
    localStorage.setItem('marksEntries', JSON.stringify(entries));
    renderEntries();
  }

  function calculateAverages() {
    if (entries.length === 0) {
      averagesDiv.innerHTML = 'No entries yet.';
      return;
    }

    // Group marks by subject
    const subjects = {};
    entries.forEach(entry => {
      if (!subjects[entry.subject]) subjects[entry.subject] = [];
      subjects[entry.subject].push(Number(entry.marks));
    });

    // Display averages
    averagesDiv.innerHTML = '';
    for (let subject in subjects) {
      const marks = subjects[subject];
      const avg = (marks.reduce((a,b) => a + b, 0) / marks.length).toFixed(2);
      const p = document.createElement('p');
      p.textContent = `${subject}: Average = ${avg}`;
      averagesDiv.appendChild(p);
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const admNo = document.getElementById('admNo').value;
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const marks = document.getElementById('marks').value;

    if (editIndex !== null) {
      entries[editIndex] = { admNo, name, subject, marks };
      editIndex = null;
    } else {
      entries.push({ admNo, name, subject, marks });
    }

    saveAndRender();
    form.reset();
  });

  renderEntries();
});
const students = [
  {adm: "DP251", name: "Hudson"},
  {adm: "DP252", name: "Mary"},
  {adm: "DP253", name: "Brian"}
];

function login() {
  let adm = document.getElementById("adm").value.trim();
  let name = document.getElementById("name").value.trim().toLowerCase();

  let found = students.find(
    s => s.adm === adm && s.name.toLowerCase() === name
  );

  if (found) {
    localStorage.setItem("student", JSON.stringify(found));
    window.location.href = "member-dashboard.html";
  } else {
    document.getElementById("error").textContent = "Invalid credentials.";
  }
}
