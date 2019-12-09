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

describe("User Api testing", () => {
    it("Enter user data, expect result: user signed up", (done) => {
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
    it("Get data using userId", (done) => {
        chai.request(server)
        .get(`/users/${userSignedIn._id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", userSignedIn.token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.user.should.be.a("object");
            res.body.user.should.have.property("_id");
            res.body.user.should.have.property("email").eql(userSignedIn.email);
            res.body.should.have.property("vacationBalance");
            res.body.vacationBalance.should.have.property("amount");
        });
    });
    it("Update user data using userId", (done) => {
        chai.request(server)
        .put(`/users/${userSignedIn._id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", userSignedIn.token)
        .send({
            firstName: "Kira",
            lastName: "Norman",
            email: userSignedIn.email,
            hiredDate: "2019-12-01",
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.user.should.be.a("object");
            res.body.user.should.have.property("_id");
            res.body.user.should.have.property("firstName").eql("Kira");
            res.body.user.should.have.property("lastName").eql("Norman");
            res.body.user.should.have.property("email");
            res.body.should.have.property("vacationBalance");
            res.body.vacationBalance.should.have.property("amount");
            res.body.user.should.have.property("hiredDate");
            res.body.user.hiredDate.match(/2019-12-01/gi).should.not.eql(null);
        });
    });

});


