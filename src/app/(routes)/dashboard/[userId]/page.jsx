import Dashboard from "../components/Dashboard"

export const metadata = {
    title: 'Dashboard | E-Marketplace',
    description: 'User dashboard page for E-Marketplace',
}

function UserDashboard({ params: { userId } }) {
    return <Dashboard id={userId}/>
}

export default UserDashboard