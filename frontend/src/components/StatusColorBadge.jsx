import React from 'react'

const StatusColorBadge = ({status}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-white font-semibold  text-yellow-600 ';
            case 'completed':
                return 'bg-white font-semibold text-green-600 ';
            case 'in-progress':
                return 'bg-white font-semibold text-blue-600 ';
            default:
                return 'bg-white font-semibold text-white ';
        }
    }

  return (
    <div>
        <span className={`font-semibold px-3 py-2 rounded-md ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    </div>
  )
}

export default StatusColorBadge