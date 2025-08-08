import React from "react";
import asstes from "../../assets/asstes";
import './Testimonials.css'

function Testimonials() {
  const TestimonialsData = [
    {
      icon: asstes.reviewProfile,
      Name: "Rajesh Mehta",
      review:
        "“SSA has become our go-to supplier for all our electrical and plumbing needs. The quality is unmatched, and they always deliver on time. Highly recommended for contractors and homeowners alike!”",
    },
    {
      icon: asstes.reviewProfile1,
      Name: "Ravi Singh",
      review:
        "“As a solar installer, sourcing quality components at fair prices was always a challenge—until we found SSA. Their solar material range is extensive and dependable. Excellent customer support too.”",
    },
    {
      icon: asstes.reviewProfile2,
      Name: "Aditya Singh",
      review:
        "“SSA made our bulk order process easy and efficient. Everything from pricing to packaging was handled professionally. We’ll definitely be back for future projects.”",
    },
    {
      icon: asstes.reviewProfile3,
      Name: "Nikhil Shah",
      review:
        "From pipes to panels, SSA has everything we need under one roof. Their product quality and availability saved us from countless delays",
    },
    {
      icon: asstes.reviewProfile4,
      Name: "Ankit Singh",
      review:
        "I ordered electrical fittings and plumbing tools for my home renovation. The products arrived quickly and were exactly as described. SSA is now my trusted source.",
    },
  ];
  return (
    <div className="Testimonial">
      <h2 className="test-title">What People Say About SSA</h2>
      <div className="Testimonials-wrapper">
        {TestimonialsData.map((testmon, index) => {
          return (
            <> 
              <div className="testmon-card">
                <div className="card-icon">
                  <img src={testmon.icon} alt={testmon.Name} />
                  <h2>{testmon.Name}</h2>
                </div>
                <p>{testmon.review}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Testimonials;
