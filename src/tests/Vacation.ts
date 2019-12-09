process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
chai.use(chaiHttp);

const should = chai.should();

const server = "http://localhost:5000/v1";
const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: "123123Az",
    passwordConfirmation: "123123Az",
};

const userSignedIn = {
    password: "123123Az",
    email: "",
    token: "",
    _id: "",
};
const  vacation = {
    _id: "",
};
describe("Vacation Api testing", () => {
    it("POST /auth/sign_up", (done) => {
        chai.request(server)
            .post("/auth/sign_up")
            .send(user)
            .set("Content-Type", "application/json")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.user.should.be.a("object");
                res.body.user.should.have.property("_id");
                res.body.user.should.have.property("email").eql(user.email);
                res.body.user.should.have.property("token");
                userSignedIn.email = user.email;
                userSignedIn.token = res.body.user.token;
                userSignedIn._id = res.body.user._id;
                done();
            });
    });

    it("POST /vacations/users/:id", () => {
        chai.request(server)
        .post(`/vacations/users/${userSignedIn._id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${userSignedIn.token}`)
        .send({
            startDate : "2019-12-17",
            endDate: "2019-12-19",
            description: "lerm impsum dolor, set amet",
        }).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.not.eql(0);
            vacation._id = res.body[0]._id;
        });
    });

    it("PUT /vacations/:id/users/:userId", () => {
        chai.request(server)
        .put(`/vacations/${vacation._id}/users/${userSignedIn._id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${userSignedIn.token}`)
        .send({
            startDate: "2019-12-17",
            endDate: "2019-12-20",
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body[0].should.have.property("_id");
            res.body[0].should.have.property("startDate");
            res.body[0].should.have.property("endDate");
            res.body[0].should.have.property("description");
        });
    });
    it("DELETE /vacations/users/:id", () => {
        chai.request(server)
        .delete(`/vacations/${vacation._id}/users/${userSignedIn._id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${userSignedIn.token}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.eql(0);
        });
    });

});


