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
};

describe("/POST Auth", () => {
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
                // @ts-ignore
                userSignedIn.email = user.email;
                done();
            });
    });
    it("Enter login and password, expect result: user signed in",  (done) => {
        chai.request(server)
            .post("/auth/sign_in")
            .send(userSignedIn)
            .set("Content-Type", "application/json")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.user.should.be.a("object");
                res.body.user.should.have.property("_id");
                res.body.user.should.have.property("email");
                res.body.user.should.have.property("token");
                done();
            });
    });
});


