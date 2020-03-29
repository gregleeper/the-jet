import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import sanity from "../../lib/sanity";
import Layout from "../../components/layout";
import imageUrlFor from "../../utils/imageURLFor";
import formatMoney from "../../utils/formatMoney";

const itemsQuery = `
 *[_type == "item"]

`;

const menusQuery = `
  *[_type == "menu"]
`;

const singleItemQuery = `
  *[_type == "item" && slug.current == $item]{
    _id,
    name,
    price,
    description,
    itemImage,
    slug,
    category->
  }
`;

const Item = ({ menus, item }) => {
  return (
    <Layout menus={menus}>
      <div className="mt-6 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-center">
          <div className="w-full sm:w-auto p-8">
            <h5 className="text-2xl text-center">{item[0].name}</h5>
            <div className="sm:flex sm:flex-none my-4 md:text-xl w-full ">
              <div className="w-1/2 object-cover mx-auto sm:mx-4">
                {item[0].itemImage ? (
                  <img
                    className="rounded-lg"
                    src={imageUrlFor(item[0].itemImage)
                      .height(400)
                      .width(400)
                      .auto("format")}
                  />
                ) : (
                  <img
                    style={{ width: "300px", height: "300px" }}
                    src="/images/jet-drive-in-logo.png"
                  />
                )}
              </div>
              <div className="mx-auto w-1/2 my-4 sm:mx-4">
                <ul className="list-disc list-outside">
                  {item[0].description ? (
                    item[0].description.map(d =>
                      d.listItem ? (
                        <div className="text-sm">
                          {d.children.map(c => (
                            <li>{c.text}</li>
                          ))}
                        </div>
                      ) : (
                        <span>
                          {d.children.map(c => (
                            <span>{c.text}</span>
                          ))}
                        </span>
                      )
                    )
                  ) : (
                    <span></span>
                  )}
                </ul>
                <div className="mt-4">
                  <span className="text-2xl">{formatMoney(item[0].price)}</span>
                </div>
              </div>
            </div>
            <div className="md:flex md:flex-wrap justify-start"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const items = await sanity.fetch(itemsQuery);

  const paths = items.map(i => ({
    params: { item: i.slug.current }
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const item = await sanity.fetch(singleItemQuery, { item: params.item });
  const menus = await sanity.fetch(menusQuery);
  return { props: { item, menus } };
};

export default Item;
