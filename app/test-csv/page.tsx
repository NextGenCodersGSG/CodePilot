'use client';

const DownloadCsvButton = () => {
    const downloadCsv = () => {
        const link = document.createElement("a");
        link.href = "/api/export-csv/all-users"; 
        link.download = "users.csv"; 
        link.click();
    };

    return (
        <button onClick={downloadCsv} className="btn cursor-pointer bg-amber-600">
            Download CSV
        </button>
    );
};

export default DownloadCsvButton;
