import React from "react";
import sanity from "../lib/sanity";
import Layout from "../components/layout";
import formatMoney from "../utils/formatMoney";
import Link from "next/link";

const menusQuery = `
  *[_type == "menu"]
`;

const itemsByCategory = `
*[_type == "category" && menu._ref in *[_type == "menu" && slug.current == $menu]._id]{
  name,
  menu->,
  categoryItems[]->,
  _id
}
`;

const Menu = ({ menus, menu, menuSlug }) => {
  function getMenuTitle() {
    const title = menus.filter((m) => m.slug.current === menuSlug);
    return title[0].title;
  }

  return (
    <Layout menus={menus}>
      <div className="mt-6 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-center">
          <div className=" mx-4 sm:w-full">
            <h5 className="text-xl text-center">{getMenuTitle()} Menu</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 ">
              {menu &&
                menu.map((c) => (
                  <div key={c._id} className="my-4 sm:p-2">
                    <div className="bg-white border-2 border-gray-600 px-2 py-1 my-2">
                      <h5 className="text-xl text-black">{c.name}</h5>
                    </div>

                    {c.categoryItems &&
                      c.categoryItems.map((i) => (
                        <ul className="text-base text-gray-700" key={i._id}>
                          <li key={i._id}>
                            <span className="justify-start">
                              <Link
                                href="/item/[item]"
                                as={`/item/${i.slug.current}`}
                              >
                                <a className="text-blue-700 hover:text-blue-900">
                                  {i.name}
                                </a>
                              </Link>
                            </span>
                            <span className="float-right px-2">
                              {i.price ? formatMoney(i.price) : ""}
                            </span>
                          </li>
                        </ul>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const menus = await sanity.fetch(menusQuery);

  const paths = menus.map((m) => ({
    params: { menu: m.slug.current },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const menu = await sanity.fetch(itemsByCategory, { menu: params.menu });
  const menus = await sanity.fetch(menusQuery);
  return { props: { menu, menuSlug: params.menu, menus } };
};

export default Menu;
