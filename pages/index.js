import Head from "next/head";
import Layout from "../components/layout";
import sanity from "../lib/sanity";
import Link from "next/link";

const menuQuery = `*[_type == "menu"]{
  _id,
  title,
  slug
}`;

const hoursQuery = `
  *[_type == "hours"] | order(_createdAt asc){
    _id,
    day,
    openTime,
    closeTime
  }
`;

const Home = props => {
  return (
    <Layout menus={props.menus}>
      <div className="mt-6 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-center mx-auto w-full">
          <img
            className="mx-auto"
            src="/images/jet-drive-in-logo.png"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <div className="sm:flex sm:items-center sm:justify-center">
          <div className="mx-auto w-8/12 sm:w-auto mt-8 text-center">
            <a
              href="tel:6205448726"
              className="text-blue-700 hover:text-blue-900 text-xl "
            >
              (620)-544-8726
            </a>
          </div>
        </div>
        <div className="sm:flex sm:justify-center">
          <div className="mx-auto w-8/12 sm:w-auto mt-8">
            <h5 className="text-xl text-center ">Menus</h5>
            <div className="">
              {props.menus.map(m => (
                <h5 className="text-center text-md text-gray-700" key={m._id}>
                  <Link href="/[menu]" as={`/${m.slug.current}`}>
                    <a className="text-blue-700 hover:text-blue-900">
                      {m.title}
                    </a>
                  </Link>
                </h5>
              ))}
            </div>
          </div>
          <div className="mx-auto w-8/12 sm:w-auto mt-8">
            <h5 className="text-xl text-center">Hours</h5>
            <ul className="text-sm text-gray-700">
              {props.hours.map(h => (
                <li key={h._id}>
                  <span className="justify-start mr-3">{h.day}</span>
                  <span className="float-right ml-3">{`${h.openTime} - ${h.closeTime}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const menus = await sanity.fetch(menuQuery);
  const hours = await sanity.fetch(hoursQuery);
  return {
    props: { menus, hours }
  };
};

export default Home;
