import React from "react";
import { useParams } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";

const Page = () => {
  const { pageId } = useParams();
  const { pageContent } = useMyContext();

  const data = pageContent[pageId];

  if (!data) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-red-600">Page Not Found</h2>
      </div>
    );
  }

  return (
    <div className="page px-6 py-10 !pt-[170px] !pb-[170px] max-w-full mx-auto flex flex-col gap-6 min-h-[100vh] text-center !m-auto">
      <header>
        <h1 className="text-4xl font-bold text-gray-800 !text-[#ff6815]">
          {data.title}
        </h1>
        {data.subtitle && (
          <>
            <h2 className="text-xl font-medium text-gray-600 mt-2">
              {data.subtitle}
            </h2>
            {data.img1 && data.img2 && (
              <>
                <div className="image-con flex gap-1 w-fit !m-auto !my-[30px]">
                  <img
                    src={data.img1}
                    className="max-h-[300px]"
                    alt={data.title}
                  />
                  <img
                    src={data.img2}
                    className="max-h-[300px]"
                    alt={data.title}
                  />
                </div>
              </>
            )}
          </>
        )}
      </header>

      {data.content && (
        <section className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: data.content.replace(/\n/g, "<br />"),
            }}
          />
        </section>
      )}

      {data.contactDetails && Array.isArray(data.contactDetails) && (
        <section className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Contact Details
          </h3>
          <ul className=" pl-6 text-gray-600 list-none">
            {data.contactDetails.map((detail, index) => {
              const [key, value] = Object.entries(detail)[0];
              return (
                <>
                <li key={index}>
                  <strong>{key}:</strong> {value.replace(`${key}: `, "")}
                </li>
                </>
              );
            })}
            <a href="tel:+91 9582 872 872">
              <button className="contact-us h-[40px] !p-[5px] bg-[#ff6815] text-[16px] font-[800] cursor-pointer text-white !my-[50px]">Contact US</button>
            </a>
          </ul>
        </section>
      )}
    </div>
  );
};

export default Page;
