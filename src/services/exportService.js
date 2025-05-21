import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportService = {
  toExcel: (data, filename = 'avaliacoes') => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Avaliações");
    XLSX.writeFile(wb, `${filename}.xlsx`);
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
