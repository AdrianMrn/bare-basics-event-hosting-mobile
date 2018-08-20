import { createConnectedStore } from 'undux'

export default createConnectedStore({
    user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    },

    attendingUpcomingEvents: [],
    attendingPastEvents: [],

    selectedEvent: {
        id: 0,
        name: '',
        slug: '',
        address: '',
        city: '',
        country: '',
        venue_name: '',
        description: '',
        date_start: '',
        date_end: '',
        type: 0,
        is_private: false,
        is_published: false,
    },

    selectedUser: {},
    selectedSponsor: {},
    selectedSession: {},

    selectedEventSessions: [],
    selectedEventSpeakers: [],
    selectedEventAttendees: [],
    selectedEventSponsors: [],

});
