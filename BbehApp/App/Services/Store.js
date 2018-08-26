import { createConnectedStore } from 'undux'

export default createConnectedStore({
    infoToastDisplayed: false,

    user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        company: '',
        position: '',
        description: '',
        linkedin: '',
        facebook: '',
        website: '',
        twitter: '',
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
        coords_lon: 0,
        coords_lat: 0,
    },

    selectedUser:  {},
    selectedSponsor:  {},
    selectedSession:  {},

    selectedEventSessions: [],
    selectedEventSpeakers: [],
    selectedEventAttendees: [],
    selectedEventSponsors: [],

});
