import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import fundamentalsImg from '../src/assets/img/fundamentals.svg';
import htmlCssImg from '../src/assets/img/html-css.svg';
import AdrianBox from '../src/blog/templates/adrian/components/box/AdrianBox';
import AdrianNewsletter from '../src/blog/templates/adrian/components/newsletter/AdrianNewsletter';
import AdrianShowcase from '../src/blog/templates/adrian/components/showcase/AdrianShowcase';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import { useSelector } from 'react-redux';
import { IStoreState } from '../src/app/store/rootReducerTypes';
import { IUser } from '../src/app/models/auth';

interface IProps {
  currentUser?: IUser;
  mapboxAccessToken: string;
}

const Home: NextPage<IProps> = ({ mapboxAccessToken }) => {
  const auth = useSelector(({ auth }: IStoreState) => auth);

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.060982, 42.35725],
      zoom: 18,
    });
  }, [mapboxAccessToken]);

  return (
    <>
      {/* Showcase */}
      <section
        id="home"
        className="bg-primary text-light pt-5 p-lg-0 pt-lg-5 text-center text-sm-start"
      >
        <AdrianShowcase />
      </section>

      {/* Newsletter */}
      <section className="bg-info text-light p-5">
        <AdrianNewsletter />
      </section>

      {/* Boxes */}
      <section className="p-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md">
              <AdrianBox
                iconClassName="bi-laptop"
                title="Virtual"
                btnText="Read More"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                voluptatum accusamus qui similique sunt delectus!
              </AdrianBox>
            </div>
            <div className="col-md">
              <AdrianBox
                iconClassName="bi-person-square"
                title="Hybrid"
                btnText="Read More"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                voluptatum accusamus qui similique sunt delectus!
              </AdrianBox>
            </div>
            <div className="col-md">
              <AdrianBox
                iconClassName="bi-people"
                title="In Person"
                btnText="Read More"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                voluptatum accusamus qui similique sunt delectus!
              </AdrianBox>
            </div>
          </div>
        </div>
      </section>

      {/* Learn Section */}
      <section id="learn" className="p-5 bg-light">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md">
              <Image
                src={fundamentalsImg}
                alt="fundamentals"
                layout="responsive"
                width={500}
                height={300}
              />
            </div>
            <div className="col-md p-5">
              <h2>Learn The Fundamentals</h2>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus delectus esse minus pariatur sunt a.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
                fuga praesentium quis quo voluptatem cum illo quae voluptates
                incidunt blanditiis ex quibusdam, reiciendis temporibus.
                Reiciendis iusto aliquid consequatur voluptas aperiam.
              </p>
              <a href="#" className="btn btn-light mt-3">
                <i className="bi-chevron-right"></i> Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="learn" className="p-5">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md p-5">
              <h2>Learn Html & CSS</h2>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus delectus esse minus pariatur sunt a.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
                fuga praesentium quis quo voluptatem cum illo quae voluptates
                incidunt blanditiis ex quibusdam, reiciendis temporibus.
                Reiciendis iusto aliquid consequatur voluptas aperiam.
              </p>
              <a href="#" className="btn btn-light mt-3">
                <i className="bi-chevron-right"></i> Read More
              </a>
            </div>
            <div className="col-md">
              <Image
                src={htmlCssImg}
                alt="html-css"
                layout="responsive"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Question Accordion */}
      <section id="questions" className="p-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion accordion-flush" id="questions">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-1"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Where exactly are you located?
                </button>
              </h2>
              <div
                id="question-1"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#questions"
              >
                <div className="accordion-body bg-light">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid labore nulla temporibus distinctio voluptatem nemo
                  assumenda incidunt earum, quaerat inventore? Accusantium,
                  voluptate! Aspernatur exercitationem labore, modi quidem
                  nostrum nesciunt, enim ratione itaque ipsum suscipit dolores,
                  amet consequatur laudantium velit facere culpa ipsa
                  dignissimos vel? Possimus illum nam dolorum quidem esse.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button collapsed bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-2"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  How much does it cost to attend?
                </button>
              </h2>
              <div
                id="question-2"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#questions"
              >
                <div className="accordion-body bg-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est,
                  facilis! Officiis ex optio modi expedita quos facere, incidunt
                  atque error cum doloribus recusandae molestiae minus eum.
                  Aliquam placeat in eligendi veritatis expedita? Velit omnis
                  error alias minus itaque, numquam, atque enim, laborum commodi
                  laboriosam quisquam quod? Nemo natus porro quo.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button collapsed bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-3"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  What do I need to know?
                </button>
              </h2>
              <div
                id="question-3"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#questions"
              >
                <div className="accordion-body bg-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum velit eos, similique, cupiditate dolores quasi vero,
                  modi error natus adipisci sint eveniet? Maxime, ab, nisi sed
                  hic quae aliquam voluptatem assumenda at eveniet inventore
                  iusto nemo tempore minus sunt molestiae explicabo blanditiis
                  nostrum in corporis. Ea vero corporis quo eius.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button collapsed bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-4"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  How do I sign up?
                </button>
              </h2>
              <div
                id="question-4"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#questions"
              >
                <div className="accordion-body bg-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum velit eos, similique, cupiditate dolores quasi vero,
                  modi error natus adipisci sint eveniet? Maxime, ab, nisi sed
                  hic quae aliquam voluptatem assumenda at eveniet inventore
                  iusto nemo tempore minus sunt molestiae explicabo blanditiis
                  nostrum in corporis. Ea vero corporis quo eius.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button collapsed bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-5"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Do you help me find a job?
                </button>
              </h2>
              <div
                id="question-5"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#questions"
              >
                <div className="accordion-body bg-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum velit eos, similique, cupiditate dolores quasi vero,
                  modi error natus adipisci sint eveniet? Maxime, ab, nisi sed
                  hic quae aliquam voluptatem assumenda at eveniet inventore
                  iusto nemo tempore minus sunt molestiae explicabo blanditiis
                  nostrum in corporis. Ea vero corporis quo eius.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="instructors" className="p-5 bg-info">
        <div className="container">
          <h2 className="text-center text-white">Our Instructors</h2>
          <p className="lead text-center text-white">
            Our instructors all have 5+ years working as a web developer in the
            industry
          </p>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <Image
                    className="rounded-circle"
                    src="https://randomuser.me/api/portraits/men/11.jpg"
                    alt="user-photo"
                    width={100}
                    height={100}
                  />
                  <h3 className="card-title my-3">John Doe</h3>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam at, cupiditate amet pariatur asperiores quas.
                  </p>
                  <a href="#">
                    <i className="bi-twitter text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-facebook text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-linkedin text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-instagram text-dark mx-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <Image
                    className="rounded-circle"
                    src="https://randomuser.me/api/portraits/women/11.jpg"
                    alt="user-photo"
                    width={100}
                    height={100}
                  />
                  <h3 className="card-title my-3">Jane Doe</h3>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam at, cupiditate amet pariatur asperiores quas.
                  </p>
                  <a href="#">
                    <i className="bi-twitter text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-facebook text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-linkedin text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-instagram text-dark mx-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <Image
                    className="rounded-circle"
                    src="https://randomuser.me/api/portraits/men/12.jpg"
                    alt="user-photo"
                    width={100}
                    height={100}
                  />
                  <h3 className="card-title my-3">Steve Smith</h3>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam at, cupiditate amet pariatur asperiores quas.
                  </p>
                  <a href="#">
                    <i className="bi-twitter text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-facebook text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-linkedin text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-instagram text-dark mx-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <Image
                    className="rounded-circle"
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="user-photo"
                    width={100}
                    height={100}
                  />
                  <h3 className="card-title my-3">Sara Smith</h3>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam at, cupiditate amet pariatur asperiores quas.
                  </p>
                  <a href="#">
                    <i className="bi-twitter text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-facebook text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-linkedin text-dark mx-1"></i>
                  </a>
                  <a href="#">
                    <i className="bi-instagram text-dark mx-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section className="p-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md">
              <h2 className="text-center">Contact Info</h2>
              <ul className="list-group list-group-flush lead">
                <li className="list-group-item">
                  <span className="fw-bold">Main Location: </span>50 Main st
                  Boston MA
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Enrollment Phone: </span>(555)
                  555-5555
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Student Phone: </span>(333) 333-3333
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Enrollment Email: </span>
                  enroll@frontendbc.test
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Student Email: </span>
                  student@frontendbc.test
                </li>
              </ul>
            </div>
            <div className="col-md">
              <div className={styles.contactMap} id="map"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-5 bg-primary text-white text-center position-relative">
        <div className="container">
          <p className="lead">Copyright &copy; 2021 Frontend Bootcamp</p>
          <a href="#" className="position-fixed bottom-0 end-0 p-5">
            <i className="bi-arrow-up-circle-fill h3"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mapboxAccessToken = process.env.MAPBOX_TOKEN;
  return {
    props: {
      mapboxAccessToken,
    },
  };
};

export default Home;
