interface DashBoardCardProps {
    title: string | undefined;
}

const DashBoardCard = ({ title = "ABC" }: DashBoardCardProps) => {
    return (
        <div className="card bg-base-100 w-48 shadow-md">
            <div className="card-body items-center space-y-4">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 14H4m6.5 3L8 20m5.5-3 2.5 3M4.88889 17H19.1111c.4909 0 .8889-.4157.8889-.9286V4.92857C20 4.41574 19.602 4 19.1111 4H4.88889C4.39797 4 4 4.41574 4 4.92857V16.0714c0 .5129.39797.9286.88889.9286ZM13 14v-3h4v3h-4Z" />
                </svg>
                <p className="text-lg font-medium">{title}</p>
            </div>
        </div>
    );
};

export default DashBoardCard;