import React, { useRef, useState } from "react";

const initialTestimonials = [
  {
    name: "Pooja Mehra",
    role: "Fashion Enthusiast",
    company: "Trendlane",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Absolutely loved the quality of the clothes! The fabric feels premium, and the delivery was quick.",
    rating: 5,
  },
  {
    name: "Riya Kapoor",
    role: "College Student",
    company: "StyleUp",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    text: "The variety of styles is amazing! Found the perfect outfit for my college fest. Super happy!",
    rating: 4,
  },
  {
    name: "Karan Singh",
    role: "Model & Influencer",
    company: "Fashnex",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "From casual to party outfits – everything was trendy and fit me perfectly. Loved it!",
    rating: 5,
  },
  {
    name: "Meera Joshi",
    role: "Working Professional",
    company: "Urban Vogue",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    text: "Loved the minimal styles and color palette. Perfect for daily office wear.",
    rating: 4,
  },
];

const TestimonialsCarousel = () => {
  const scrollRef = useRef(null);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    image: "",
    text: "",
    rating: 5,
  });

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const newTestimonial = {
      ...form,
      image:
        form.image ||
        `https://randomuser.me/api/portraits/lego/${Math.floor(
          Math.random() * 10
        )}.jpg`,
      rating: parseInt(form.rating),
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setForm({
      name: "",
      role: "",
      company: "",
      image: "",
      text: "",
      rating: 5,
    });
  };

  return (
    <div className="bg-white py-16 px-4 text-center">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif text-neutral-800 tracking-wide">
          TESTIMONIALS
        </h2>
        <p className="max-w-xl mx-auto text-base text-neutral-500 mt-3 font-serif italic">
          Hear what our happy customers are saying about their shopping
          experience with us.
        </p>
      </div>

     
      <div className="relative flex items-center justify-center mb-12">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-full z-10"
        >
          ←
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-6 py-4 scrollbar-hide"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] max-w-[320px] bg-gray-50 border p-6 rounded-lg text-left shadow hover:shadow-md transition-all flex-shrink-0"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                  <p className="text-xs text-blue-500 font-medium">
                    {item.company}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-2 text-yellow-500 text-sm">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {[...Array(5 - item.rating)].map((_, i) => (
                  <span key={i}>☆</span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-full z-10"
        >
          →
        </button>
      </div>

      {/* Add Your Review Form */}
      <div className="max-w-xl mx-auto">
        <h3 className="text-2xl font-serif text-gray-800 mb-4">
          Add Your Review
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-4 py-2"
          />

          <textarea
            name="text"
            placeholder="Your review"
            value={form.text}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                className="text-2xl focus:outline-none"
              >
                <span
                  className={
                    star <= form.rating ? "text-yellow-500" : "text-gray-300"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold rounded py-2 hover:bg-pink-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
