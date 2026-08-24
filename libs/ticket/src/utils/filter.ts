export const formatDate = (date:any) => {
    return new Date(date).toLocaleString();
};

export const getFilterOptions = (field: string) => {
    if (field === "status") {
        return [
            { label: "Open", value: 1 },
            { label: "Closed", value: 2 },
            { label: "In Progress", value: 3 },
        ];
    } else if (field === "priority") {
        return [
            { label: "Low", value: 1 },
            { label: "Medium", value: 2 },
            { label: "High", value: 3 },
            { label: "Critical", value: 4 },
        ];
    }
    return [];
};

export const statusMap = (status: string) => {
    if (status === "open") {
        return 1;
    } else if (status === "closed") {
        return 2;
    } else if (status === "inProgress"){
        return 3
    } else 
        return ;
};
