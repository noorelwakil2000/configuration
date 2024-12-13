let currentStep = 1;

function nextStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
}

function previousStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
}

function resetWizard() {
    location.reload();
}

function calculateSummary() {
    const region = document.getElementById('region').value;
    const students = document.getElementById('students').value;
    const labType = document.getElementById('labType')?.value || 'N/A';
    const labCount = parseInt(document.getElementById('labCount')?.value || 0);
    const customArea = parseInt(document.getElementById('customArea')?.value || 30);
    const areaCost = parseInt(document.getElementById('areaCost')?.value || 0);
    const managerSalary = parseInt(document.getElementById('managerSalary')?.value || 0);
    const teacherSalary = parseInt(document.getElementById('teacherSalary')?.value || 0);

    const classroomCost = 19500;
    const embeddedLabCost = 12000;
    const separateLabCost = 15000;

    let classroomsNeeded = 1;
    if (students === '100-200') classroomsNeeded = 2;
    if (students === '200-300') classroomsNeeded = 3;
    if (students === '300-400') classroomsNeeded = 4;
    if (students === '400+') classroomsNeeded = Math.ceil(400 / 100);

    const totalClassroomCost = classroomsNeeded * classroomCost;

    const totalLabCost = labType === 'separate'
        ? labCount * separateLabCost
        : labCount * embeddedLabCost;

    const totalAreaCost = customArea * areaCost;

    const totalStaffCost = managerSalary + teacherSalary;

    const totalExpenses = totalClassroomCost + totalLabCost + totalAreaCost + totalStaffCost;

    const yearlyRevenue = students === '50-100' ? 65000 : classroomsNeeded * 65000;
    const profit = yearlyRevenue - totalExpenses;

    const initialInvestment = totalClassroomCost + totalLabCost + totalAreaCost;
    const annualizedROI = (((profit / initialInvestment) + 1) ** (1 / 3) - 1) * 100;

    const summaryContent = `
        Region: ${region}<br>
        Estimated Students: ${students}<br>
        Lab Type: ${labType}<br>
        Number of Labs: ${labCount}<br>
        Custom Area: ${customArea} m²<br>
        Total Area Cost: €${totalAreaCost.toLocaleString()}<br>
        Total Expenses: €${totalExpenses.toLocaleString()}<br>
        Yearly Revenue: €${yearlyRevenue.toLocaleString()}<br>
        Profit: €${profit.toLocaleString()}<br>
        Annualized ROI (3 years): ${annualizedROI.toFixed(2)}%
    `;

    document.getElementById('summaryContent').innerHTML = summaryContent;
    nextStep(6);
}
