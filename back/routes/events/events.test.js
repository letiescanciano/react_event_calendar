const app = require("../../app.js");

const supertest = require("supertest");
const request = supertest(app);

describe("Get Events correctly", () => {
  it("should return a list of events ", async () => {
    const res = await request.get("/events");
    // console.log("res", res.body);
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return a list of events with title, description, start and end date ", async () => {
    const res = await request.get("/events");

    res.body.forEach((event) => {
      expect(event).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          start: expect.any(String),
          end: expect.any(String),
        })
      );
    });
  });
});

describe("Get information of a single event correctly", () => {
  let newEvent = {};
  beforeEach(async () => {
    newEvent = await request.post("/events").send({
      title: "test event to get information",
      description: "Event created by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
  });

  it("should return a object if the event exists", async () => {
    const res = await request.get(`/events/${newEvent.body._id}`);
    // console.log("res", res.body);
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
  });
  it("should return a single event with title, description, start and end date ", async () => {
    const res = await request.get(`/events/${newEvent.body._id}`);

    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     _id: expect.any(String),
    //     title: expect.any(String),
    //     description: expect.any(String),
    //     start: expect.any(String),
    //      end: expect.any(String),
    //   })
    // );
    expect(res.body).toEqual(
      expect.objectContaining({
        title: "test event to get information",
        description: "Event created by jest",
        start: "2020-09-01T15:18:23.123Z",
        end: "2020-09-02T15:18:23.123Z",
      })
    );
  });

  it("should return a msg if the event _id is not correct", async () => {
    const res = await request.get("/events/5f4e663f4e58b66d3a6b34e");

    expect(res.status).toEqual(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.msg).toBe(
      "_id is not correct. Please check it and try again"
    );
  });
  it("should return a msg if the event does not exist", async () => {
    const res = await request.get("/events/5f4e663f4e58b66d3a6b34e1");

    expect(res.status).toEqual(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.msg).toBe("No event match the id provided");
  });
});

describe("Create a new event", () => {
  it("should create a new event", async () => {
    const res = await request.post("/events").send({
      title: "test event",
      description: "Event created by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(201);
    expect(res.body).toMatchObject({
      title: "test event",
      description: "Event created by jest",
      start: "2020-09-01T15:18:23.123Z",
      end: "2020-09-02T15:18:23.123Z",
    });
  });
  it("should not create a new event if is missing a title field", async () => {
    const res = await request.post("/events").send({
      // title: "don't create test event ",
      description: "Event created by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(400);
  });
  it("should not create a new event if is missing description field", async () => {
    const res = await request.post("/events").send({
      title: "don't create test event ",
      // description: "Event created by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(400);
  });
  it("should not create a new event if is missing a start field", async () => {
    const res = await request.post("/events").send({
      title: "don't create test event ",
      description: "Event created by jest",
      // start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(400);
  });
  it("should not create a new event if is missing a end field", async () => {
    const res = await request.post("/events").send({
      title: "don't create test event ",
      description: "Event created by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      // end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(400);
  });
});

describe("Update an existing event", () => {
  let newEvent = {};
  beforeEach(async () => {
    newEvent = await request.post("/events").send({
      title: "test event to update",
      description: "Event created by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
  });

  it("should update an existing event", async () => {
    const res = await request.put(`/events/${newEvent.body._id}`).send({
      title: "test event updated true",
      description: "Event updated by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(201);
    expect(res.body).toMatchObject({
      title: "test event updated true",
      description: "Event updated by jest",
      start: "2020-09-01T15:18:23.123Z",
      end: "2020-09-02T15:18:23.123Z",
    });
  });
  it("should not update a new event if is missing a title field", async () => {
    const res = await request.put(`/events/${newEvent.body._id}`).send({
      // title: "don't update test event ",
      description: "Event updated by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(400);
  });
  it("should not update a new event if is missing description field", async () => {
    const res = await request.put(`/events/${newEvent.body._id}`).send({
      title: "don't update test event ",
      // description: "Event updated by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(400);
  });
  it("should not update a new event if is missing a start field", async () => {
    const res = await request.put(`/events/${newEvent.body._id}`).send({
      title: "don't update test event ",
      description: "Event updated by jest",
      // start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(400);
  });
  it("should not update a new event if is missing a end field", async () => {
    const res = await request.put(`/events/${newEvent.body._id}`).send({
      title: "don't update test event ",
      description: "Event updated by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      // end: "2020-09-02T15:18:23.123+00:00",
    });
    expect(res.status).toEqual(400);
  });
});

describe("Delete an existing event", () => {
  it("should delete an existing event", async () => {
    const newEvent = await request.post("/events").send({
      title: "test event to delete",
      description: "Event created by jest",
      start: "2020-09-01T15:18:23.123+00:00",
      end: "2020-09-02T15:18:23.123+00:00",
    });
    const response = await request.delete(`/events/${newEvent.body._id}`);
    const getEvent = await request.get(`/events/${newEvent.body._id}`);

    expect(response.status).toEqual(200);
    expect(response.body.msg).toBe("Event deleted correctly");
    expect(response.body.ok).toBe(true);

    expect(getEvent.status).toEqual(400);
    expect(getEvent.body.ok).toBe(false);
    expect(getEvent.body.msg).toBe("No event match the id provided");
  });
});
