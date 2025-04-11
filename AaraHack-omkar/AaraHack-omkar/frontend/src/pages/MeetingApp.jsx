import React, { useState, useEffect, useCallback } from 'react';

const WherebyMeetingApp = () => {
  const [meetings, setMeetings] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [hostName, setHostName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Backend API URL - adjust as needed
  const API_URL = import.meta.env.VITE_BACKEND_API;

  // Calculate default end date (24 hours from now)
  const getTomorrowDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
  };



  // Fetch meetings from Django backend
  const fetchMeetings = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/meetings/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch meetings');
      }
      
      const data = await response.json();
      setMeetings(data);
    } catch (err) {
      console.error('Error fetching meetings:', err);
      setError('Failed to load meetings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const createMeeting = async () => {
    if (!roomName.trim()) {
      setError('Room name is required');
      return;
    }

    if (!endDate) {
      setError('End date is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log("roomName",roomName);
      console.log("Date",endDate);
      
      const response = await fetch(`${API_URL}/meetings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        
        body: JSON.stringify({
          room_name: roomName,
          host_name: hostName || 'Anonymous',
          end_date: new Date(endDate).toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create meeting');
      }

      const newMeeting = await response.json();
      setMeetings(prevMeetings => [...prevMeetings, newMeeting]);
      setRoomName('');
      setHostName('');
      setEndDate(getTomorrowDateTime()); // Reset to default
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const joinMeeting = (meetingUrl) => {
    window.open(meetingUrl, '_blank');
  };

  const endMeeting = async (meetingId) => {
    try {
      const response = await fetch(`${API_URL}/meetings/${meetingId}/end_meeting/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to end meeting');
      }

      // Update the meeting status locally
      setMeetings(prevMeetings => 
        prevMeetings.map(meeting => 
          meeting.id === meetingId ? { ...meeting, status: 'ended' } : meeting
        )
      );
      
      // Refresh the meetings list
      fetchMeetings();
    } catch (err) {
      console.error('Error ending meeting:', err);
      setError('Failed to end meeting. Please try again.');
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-slate-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Discussion</span> 
        </h1>
        {/* <p className="text-center text-slate-500 mt-2">Create and manage your meetings with ease</p> */}
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Meeting Section */}
        <div className="lg:col-span-5">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Create a New Meeting
              </h2>
            </div>
            
            <div className="p-6">
              <div className="mb-5">
                <label htmlFor="roomName" className="block text-sm font-medium text-slate-700 mb-1">
                  Room Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
                  placeholder="Enter room name"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="hostName" className="block text-sm font-medium text-slate-700 mb-1">
                  Host Name
                </label>
                <input
                  type="text"
                  id="hostName"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
                  placeholder="Enter host name (optional)"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">
                  End Date/Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
                />
                <p className="text-xs text-slate-500 mt-1 italic">
                  When the meeting will expire (default: 24 hours from now)
                </p>
              </div>
              
              {error && (
                <div className="mb-5 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              
              <button
                onClick={createMeeting}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 font-medium shadow-md flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    Create Meeting
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Active Meetings Section */}
        <div className="lg:col-span-7">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Active Meetings
              </h2>
            </div>
            
            <div className="p-4">
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              
              {!isLoading && meetings.length === 0 && (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-slate-500">No active meetings available</p>
                  <p className="text-slate-400 text-sm mt-1">Create a new meeting to get started</p>
                </div>
              )}
              
              {!isLoading && meetings.length > 0 && (
                <ul className="divide-y divide-slate-200">
                  {meetings.map((meeting) => (
                    <li key={meeting.id} className="py-4 transition-all hover:bg-slate-50">
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-slate-800">{meeting.room_name}</h3>
                            <div className="flex items-center mt-1 text-sm text-slate-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              Host: {meeting.host_name || 'Unnamed'}
                            </div>
                            <div className="flex items-center mt-1 text-sm text-slate-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              Created: {new Date(meeting.created_at).toLocaleString()}
                            </div>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => joinMeeting(meeting.host_room_url)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            Join as Host
                          </button>
                          <button
                            onClick={() => joinMeeting(meeting.viewer_room_url)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            Join as Viewer
                          </button>
                          <button
                            onClick={() => endMeeting(meeting.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            End Meeting
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
export default WherebyMeetingApp;