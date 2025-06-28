import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center font-serif">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif text-neutral-800 tracking-wide">
          NewSletter
        </h2>
        <p className="max-w-xl mx-auto text-base text-neutral-500 mt-3 font-serif italic">
          Be the first to know about new arrivals, special collections, tips,
          and more. Join our community and never miss a trend!
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none font-serif text-sm"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 font-serif"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
