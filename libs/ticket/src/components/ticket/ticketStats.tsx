const TicketStats = ({openTickets, inProgressTickets, closedTickets, overdueTickets, totalTickets}:any ) => {
    const stats = [
        { count: openTickets, label: "Open Tickets", color: "#FFD403" },
        { count: inProgressTickets, label: "In-Progress Tickets", color: "#8EC100" },
        { count: closedTickets, label: "Closed Tickets", color: "#548C1C" },
        { count: overdueTickets, label: "Overdue Tickets", color: "#f87171" },
        { count: totalTickets, label: "Total Tickets", color: "#076334" },
    ];

    return (
        
        <div className="sm:flex flex-col justify-content-between p-3 gap-5 w-full">
            {stats.map((stat, index) => (
                <div key={index} className={`flex flex-column bg-white sm:w-16rem w-full p-3 border-round sm:mt-0 mt-4  justify-content-between`} style={{border: "1px solid green"}}>
                    <div className="flex flex-row justify-content-center h-4rem">
                        <div className={`text-5xl text-${stat.color}`} style={{color:stat.color}}>{stat.count}</div>
                    </div>
                    <div className="flex flex-row justify-content-center">
                        <div className="text-xl text-gray-700">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default TicketStats;
