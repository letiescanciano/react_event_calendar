import axios from "axios";

class EventServices {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:4000",
    });
  }

  getEvents = () => this.service.get(`/events`);
  getEvent = (_id) => this.service.get(`/events/${_id}`);
  createEvent = (event) => this.service.post(`/events`, event);
  updateEvent = (event) => this.service.put(`/events/${event._id}`, event);
  deleteEvent = (_id) => this.service.delete(`/events/${_id}`);
}
export default EventServices;
