import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportService = {
  toExcel: async (data, filename = 'avaliacoes') => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Avaliações');

    worksheet.columns = [
      { header: 'Funcionário', key: 'employeeName', width: 20 },
      { header: 'Departamento', key: 'department', width: 20 },
      { header: 'Período', key: 'period', width: 15 },
      { header: 'Classificação', key: 'rating', width: 15 }
    ];

    data.forEach(row => worksheet.addRow(row));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  },

  toPDF: (data, filename = 'avaliacoes') => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Funcionário', 'Departamento', 'Período', 'Classificação']],
      body: data.map(item => [
        item.employeeName,
        item.department,
        item.period,
        item.rating
      ])
    });
    doc.save(`${filename}.pdf`);
  }
};
