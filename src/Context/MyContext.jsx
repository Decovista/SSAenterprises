import { useContext, useState, createContext } from "react";
import assets from "../assets/asstes";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggleLog, setToggleLog] = useState(false);
  const [toggleCart, setToggleCart] = useState(0);
  const [popCart, setPopCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { addTo, setAddTo } = useState();
  const [toggleMSearch, setToggleMSearch] = useState(false);
  const [toggleLogin, setToggleLogin] = useState("");
  const filteredProducts = "";
  const handleDecreaseQty = async (product) => {
    const token = getToken();
    if (!token) {
      alert("You must be logged in to update cart.");
      return;
    }

    try {
      setErrorMsg("");
      const productId = product._id || product.id;
      const current = cartItems.find(
        (item) => (item._id || item.id) === productId
      );
      if (!current || current.qty <= 0) return;

      const newQty = current.qty - 1;

      await axios.patch(
        "https://ssa-backend-y3ne.onrender.com/api/cart/update",
        { productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedCart = cartItems
        .map((item) =>
          (item._id || item.id) === productId ? { ...item, qty: newQty } : item
        )
        .filter((item) => item.qty > 0);

      setCartItems(updatedCart);
      setToggleCart((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to decrease quantity";
      console.error("Error updating quantity:", msg);
      setErrorMsg(msg);
    }
  };
  const handleAddToCart = async (product) => {
    const token = getToken();
    if (!token) {
      alert("You must be logged in to add products to cart.");
      return;
    }

    try {
      setErrorMsg("");
      const productId = product._id || product.id;
      const productname = product.name;
      const quantity = 1;
      const img = product.img;

      // Validate data before sending
      if (!productId || !productname || !quantity || !img) {
        setErrorMsg("productId, productname, quantity, and img are required");
        console.error("Add to cart error: Required fields missing");
        return;
      }

      await axios.post(
        "https://ssa-backend-y3ne.onrender.com/api/cart/add",
        { productId, productname, quantity, img },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const existing = cartItems.find(
        (item) => (item._id || item.id) === productId
      );
      let updatedCart;
      if (existing) {
        updatedCart = cartItems.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        updatedCart = [...cartItems, { ...product, _id: productId, qty: 1 }];
      }

      setCartItems(updatedCart);
      setToggleCart((prev) => prev + 1);
      setAddTo(true);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to add product to cart";
      console.error("Error adding to cart:", msg);
      setErrorMsg(msg);
    }
  };
  const pageContent = {
    homepage: {
      title: "Homepage",
      subtitle: "Innovative Solutions for Modern Infrastructure",
      content: `
        Welcome to SSA Enterprises – your trusted partner in electrical, plumbing, solar, and infrastructure services. 
        Our mission is to empower businesses and homes with reliable, sustainable, and future-ready solutions.
        
        Why choose us?
        - Industry-leading technology
        - Exceptional customer support
        - Quality assurance on every product and service
        
        Let us power your success with our expertise and commitment to excellence.
      `,
    },
    technology: {
      title: "Technology",
      subtitle: "Powering Progress Through Innovation",
      content: `
        At SSA Enterprises, technology drives everything we do. From smart electrical grids to solar energy systems, 
        our solutions are built on cutting-edge advancements and best-in-class tools.
        
        What we offer:
        - Smart infrastructure solutions
        - Automation and IoT for homes and industries
        - High-efficiency energy systems
        
        Discover how our technology transforms everyday operations into intelligent ecosystems.
      `,
    },
    about: {
      title: "About Us",
      subtitle: "Our Journey, Vision, and Values",
      content: `
        SSA Enterprises was founded with a mission to bring quality, innovation, and reliability to core infrastructure services. 
        Over the years, we’ve grown from a small service provider into a comprehensive solutions powerhouse.
        
        Our core values:
        - Integrity in every project
        - Commitment to quality
        - Customer-first mindset
        
        With decades of experience, a skilled team, and unwavering dedication, we continue to redefine what’s possible in the sectors we serve.
      `,
    },
    resources: {
      title: "Resources & News",
      subtitle: "Insights, Articles, and Industry Updates",
      content: `
        Stay ahead with the latest trends, updates, and how-to guides from SSA Enterprises.
        
        Featured sections:
        - Industry trends and analysis
        - Product installation guides
        - Expert tips and tricks
        
        Whether you're a contractor, engineer, or homeowner, our resources are designed to inform and empower you.
      `,
    },
    careers: {
      title: "Careers",
      subtitle: "Your Future Starts Here",
      content: `
        Join SSA Enterprises and become a part of a dynamic team that values innovation, teamwork, and personal growth.
        
        Why work with us?
        - Competitive salaries and benefits
        - Inclusive and supportive work culture
        - Opportunities for training and advancement
        
        We’re hiring across multiple departments. Browse open positions and apply today!
      `,
    },
    contact: {
      title: "Contact Us",
      subtitle: "We’re Here to Help",
      content: `
        Got questions, need support, or want to partner with us? We're just a message away.
        
        Reach us via:
        
        Our customer support is available Monday to Friday, 9 AM – 6 PM.
      `,
      contactDetails: [
        { Phone: "Call US: +91 9582 872 872, +91 8368 450 521" },
        // { Email: "Email: contact@ssaenterprises.com" },
        {
          Office:
            "417, 4th Floor, Vipul Business Park, Sector 48, Main Sohna Road, Gurugram-122011.",
        },
      ],
    },
    electrical: {
      title: "Electrical",
      subtitle: "Premium Electrical Solutions for Every Application",
      img1: assets.ElectricalPageimg1,
      img2: assets.ElectricalPageimg2,
      content: `
        We provide a comprehensive range of electrical products and services tailored to meet residential, commercial, and industrial needs.
        
        Products include:
        - Circuit breakers, switchboards, and wiring systems
        - Smart meters and energy monitors
        - LED lighting and automation devices
        
        Built with safety and efficiency in mind, our electrical offerings ensure seamless performance.
      `,
    },
    plumbing: {
      title: "Plumbing",
      subtitle: "Top-Tier Plumbing Systems & Components",
      img1: assets.PlumbingPageimg1,
      img2: assets.PlumbingPageimg2,
      content: `
        From leak-proof pipelines to state-of-the-art water systems, SSA Enterprises delivers quality plumbing solutions.
        
        Our offerings:
        - Pipes, fittings, and valves
        - Bathroom and kitchen fixtures
        - Water heating and filtration systems
        
        All our products adhere to international quality standards and are tested for long-term durability.
      `,
    },
    solar: {
      title: "Solar",
      subtitle: "Clean Energy for a Brighter Tomorrow",
      img1: assets.SolarPageimg1,
      img2: assets.SolarPageimg2,
      content: `
        Embrace sustainability with SSA Enterprises' solar solutions. We help you transition to solar power with ease and efficiency.
        
        Solutions include:
        - Solar panels (mono & polycrystalline)
        - Inverters and battery storage systems
        - Installation and maintenance services
        
        Power your home or business with renewable energy and reduce your carbon footprint.
      `,
    },
    other: {
      title: "Other Products",
      subtitle: "Diverse Solutions for Specialized Needs",
      content: `
        We offer a wide array of products that cater to niche industrial requirements and emerging technologies.
        
        Specialty offerings:
        - HVAC components
        - Industrial automation tools
        - Safety and monitoring equipment
        
        Designed for performance and flexibility, our miscellaneous products complement your infrastructure goals.
      `,
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Your Data, Our Responsibility",
      content: `
        We take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
        
        Key highlights:
        - We do not sell your data
        - All data is encrypted and stored securely
        - You have full control over your information
        
        By using our website, you agree to the practices outlined in this policy.
      `,
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Understanding Your Rights and Responsibilities",
      content: `
        These terms govern your use of SSA Enterprises' website and services. Please read them carefully.
        
        Includes:
        - Acceptable use policy
        - User responsibilities
        - Disclaimers and limitations of liability
        
        Continued use of our platform signifies your acceptance of these terms.
      `,
    },
  };
  const productsData = [
    // Electrical
    {
      id: 1,
      name: "Wiring Kit",
      img: assets.wiringkit,
      category: "Electrical",
      bestSeller: true,
      price: 499,
      description:
        "Complete wiring kit with cables, terminals, and connectors for domestic and industrial use.",
      relatedProductIds: [6, 10, 3],
      tags: ["wiring", "kit", "cables"],
    },
    {
      id: 2,
      name: "LED Light",
      img: assets.Ledpannellight,
      category: "Electrical",
      price: 299,
      description: "Energy-saving LED panel light ideal for indoor lighting.",
      relatedProductIds: [8, 10, 3],
      tags: ["light", "LED", "energy-saving"],
    },
    {
      id: 3,
      name: "Switch Board",
      img: assets.ModularElectricSwitc,
      category: "Electrical",
      price: 399,
      description:
        "Modular electric switch board with universal compatibility.",
      relatedProductIds: [9, 2, 1],
      tags: ["switch", "board", "modular"],
    },
    {
      id: 4,
      name: "Ceiling Fan",
      img: assets.CeilingFan,
      category: "Electrical",
      price: 1500,
      description: "Energy-efficient ceiling fan with high-speed motor.",
      relatedProductIds: [2, 10, 30],
      tags: ["fan", "cooling", "electrical"],
    },
    {
      id: 5,
      name: "MCB Box",
      bestSeller: true,
      img: assets.MCBs,
      category: "Electrical",
      price: 999,
      description:
        "Miniature Circuit Breaker box for household electrical protection.",
      relatedProductIds: [1, 3, 10],
      tags: ["MCB", "safety", "breaker"],
    },
    {
      id: 6,
      name: "Wire Cutter",
      img: assets.WireCutters,
      category: "Electrical",
      price: 250,
      description:
        "Precision wire cutter for electrical installations and maintenance.",
      relatedProductIds: [1, 10],
      tags: ["tool", "wire", "cutter"],
    },
    {
      id: 7,
      name: "Voltage Tester",
      img: assets.DigitalVoltage,
      category: "Electrical",
      price: 150,
      description: "Digital voltage tester for safety checks and diagnostics.",
      relatedProductIds: [6, 5],
      tags: ["tester", "voltage", "safety"],
    },
    {
      id: 8,
      name: "Bulb Holder",
      img: assets.BulbHolder,
      category: "Electrical",
      price: 120,
      description: "Durable bulb holder compatible with standard bulbs.",
      relatedProductIds: [2, 9],
      tags: ["bulb", "holder", "light"],
    },
    {
      id: 9,
      name: "Power Socket",
      img: assets.UniversalPowerSocketwith,
      category: "Electrical",
      price: 180,
      description: "Universal power socket with surge protection.",
      relatedProductIds: [3, 10],
      tags: ["socket", "power", "electrical"],
    },
    {
      id: 10,
      name: "Electrical Tape",
      img: assets.Electricaltape,
      category: "Electrical",
      price: 49,
      description: "Insulated electrical tape for wire protection and safety.",
      relatedProductIds: [6, 1, 5],
      tags: ["tape", "electrical", "insulation"],
    },

    // Plumbing
    {
      id: 11,
      name: "Water Pipe",
      bestSeller: true,
      img: assets.CoiledbluePVC,
      category: "Plumbing",
      price: 199,
      description: "Flexible PVC water pipe ideal for plumbing systems.",
      relatedProductIds: [12, 13, 20],
      tags: ["pipe", "PVC", "water"],
    },
    {
      id: 12,
      name: "PVC Elbow",
      img: assets.DPVCelbowpipe,
      category: "Plumbing",
      price: 49,
      description: "Durable elbow fitting to change pipe direction.",
      relatedProductIds: [11, 13],
      tags: ["fitting", "elbow", "PVC"],
    },
    {
      id: 13,
      name: "Pipe Cutter",
      img: assets.Pipecutter,
      category: "Plumbing",
      price: 499,
      description: "Tool for precise cutting of PVC pipes.",
      relatedProductIds: [11, 12],
      tags: ["tool", "cutter", "pipe"],
    },
    {
      id: 14,
      name: "Tap Handle",
      img: assets.ChromeTapHandle,
      category: "Plumbing",
      price: 150,
      description: "Chrome finish tap handle for modern plumbing fixtures.",
      relatedProductIds: [15, 17],
      tags: ["tap", "handle", "plumbing"],
    },
    {
      id: 15,
      name: "Shower Head",
      img: assets.Modernoverheadshower,
      category: "Plumbing",
      price: 399,
      description: "Modern overhead shower head for bathrooms.",
      relatedProductIds: [14, 18],
      tags: ["shower", "bathroom", "head"],
    },
    {
      id: 16,
      name: "Drain Trap",
      img: assets.PlasticSinkdrain,
      category: "Plumbing",
      price: 249,
      description: "Plastic drain trap for sinks and basins.",
      relatedProductIds: [19, 18],
      tags: ["drain", "trap", "sink"],
    },
    {
      id: 17,
      name: "Angle Valve",
      bestSeller: true,
      img: assets.AngleValve,
      category: "Plumbing",
      price: 189,
      description: "Brass angle valve used in water inlet control.",
      relatedProductIds: [14, 20],
      tags: ["valve", "angle", "plumbing"],
    },
    {
      id: 18,
      name: "Flexible Hose",
      img: assets.StainlessSteelFlexible,
      category: "Plumbing",
      price: 199,
      description: "Flexible stainless steel hose for water connections.",
      relatedProductIds: [15, 17],
      tags: ["hose", "flexible", "steel"],
    },
    {
      id: 19,
      name: "Flush Valve",
      img: assets.ToiletFlushvalvemechanism,
      category: "Plumbing",
      price: 349,
      description: "Toilet flush valve mechanism for efficient water use.",
      relatedProductIds: [16, 20],
      tags: ["flush", "toilet", "valve"],
    },
    {
      id: 20,
      name: "Pipe Sealant",
      img: assets.Plumbingpipe,
      category: "Plumbing",
      price: 99,
      description: "Sealant for leak-proof pipe connections.",
      relatedProductIds: [11, 12, 17],
      tags: ["sealant", "pipe", "plumbing"],
    },

    // Solar
    {
      id: 21,
      name: "Solar Panel",
      bestSeller: true,
      img: assets.SolarPanel,
      category: "Solar",
      price: 1500,
      description: "High-efficiency polycrystalline solar panel.",
      relatedProductIds: [22, 24, 25],
      tags: ["solar", "panel", "renewable"],
    },
    {
      id: 22,
      name: "Inverter",
      img: assets.Wallmountedsolarinverter,
      category: "Solar",
      price: 2500,
      description: "Wall-mounted inverter for solar energy systems.",
      relatedProductIds: [21, 23, 24],
      tags: ["solar", "inverter", "conversion"],
    },
    {
      id: 23,
      name: "Charge Controller",
      img: assets.DigitalSolarCharge,
      category: "Solar",
      price: 999,
      description: "Digital charge controller to regulate battery charging.",
      relatedProductIds: [22, 26],
      tags: ["controller", "charge", "solar"],
    },
    {
      id: 24,
      name: "Solar Battery",
      img: assets.TubularSolarBattery,
      category: "Solar",
      price: 3000,
      description: "Tubular solar battery for reliable energy storage.",
      relatedProductIds: [22, 23],
      tags: ["battery", "solar", "storage"],
    },
    {
      id: 25,
      name: "Mounting Kit",
      img: assets.solarpanelmountingkit,
      category: "Solar",
      price: 799,
      description: "Mounting kit for rooftop solar panel installation.",
      relatedProductIds: [21, 26],
      tags: ["mounting", "kit", "solar"],
    },
    {
      id: 26,
      name: "Solar Cable",
      img: assets.SolarCables,
      category: "Solar",
      price: 249,
      description: "Durable solar cable for PV systems.",
      relatedProductIds: [25, 23],
      tags: ["cable", "solar", "PV"],
    },
    {
      id: 27,
      name: "DC Combiner Box",
      img: assets.SolarDCcombinerbox,
      category: "Solar",
      price: 699,
      description: "Combiner box for managing multiple solar panel outputs.",
      relatedProductIds: [21, 22],
      tags: ["DC", "box", "combiner"],
    },
    {
      id: 28,
      name: "Solar Lamp",
      img: assets.Ledpannel,
      category: "Solar",
      price: 599,
      description:
        "Portable solar-powered LED lamp for indoor and outdoor use.",
      relatedProductIds: [26, 30],
      tags: ["lamp", "solar", "LED"],
    },
    {
      id: 29,
      name: "MC4 Connectors",
      img: assets.MC4solarconnectors,
      category: "Solar",
      price: 149,
      description: "Standard MC4 connectors for solar panel wiring.",
      relatedProductIds: [26, 21],
      tags: ["connector", "MC4", "solar"],
    },
    {
      id: 30,
      name: "Solar Fan",
      img: assets.TableTop,
      category: "Solar",
      price: 1200,
      description: "Energy-saving solar-powered tabletop fan.",
      relatedProductIds: [28, 4],
      tags: ["fan", "solar", "cooling"],
    },

    // Electronics
    {
      id: 31,
      name: "Circuit Board",
      img: assets.ComingSoon,
      category: "Electronics",
      price: 999,
      description: "Multi-layered PCB for electronic project assembly.",
      relatedProductIds: [33, 34, 40],
      tags: ["PCB", "circuit", "board"],
    },
    {
      id: 32,
      name: "Sensor",
      img: assets.SensorModule,
      category: "Electronics",
      price: 799,
      description: "Sensor module compatible with Arduino for automation.",
      relatedProductIds: [40, 33],
      tags: ["sensor", "module", "automation"],
    },
    {
      id: 33,
      name: "Microcontroller",
      img: assets.MicrocontrollerBoard,
      category: "Electronics",
      price: 1199,
      description: "Programmable board for controlling electronics.",
      relatedProductIds: [40, 32],
      tags: ["microcontroller", "programming", "board"],
    },
    {
      id: 34,
      name: "Resistor Pack",
      img: assets.Resistorswith,
      category: "Electronics",
      price: 99,
      description: "Pack of various resistors for circuit building.",
      relatedProductIds: [35, 36],
      tags: ["resistor", "electronics", "components"],
    },
    {
      id: 35,
      name: "Breadboard",
      img: assets.SolderlessBreadboard,
      category: "Electronics",
      price: 149,
      description: "Solderless breadboard for rapid prototyping.",
      relatedProductIds: [34, 36],
      tags: ["breadboard", "testing", "prototype"],
    },
    {
      id: 36,
      name: "Jumper Wires",
      img: assets.Jumperwires,
      category: "Electronics",
      price: 89,
      description: "Flexible jumper wires for breadboard connections.",
      relatedProductIds: [35, 34],
      tags: ["jumper", "wire", "connection"],
    },
    {
      id: 37,
      name: "Transistor Kit",
      img: assets.ComingSoon,
      category: "Electronics",
      price: 249,
      description: "Assorted transistors for electronic circuits.",
      relatedProductIds: [34, 38],
      tags: ["transistor", "components", "electronics"],
    },
    {
      id: 38,
      name: "Relay Module",
      img: assets.ComingSoon,
      category: "Electronics",
      price: 399,
      description: "Relay module for high-voltage switching.",
      relatedProductIds: [33, 37],
      tags: ["relay", "module", "switching"],
    },
    {
      id: 39,
      name: "LCD Display",
      img: assets.LCDmodule,
      category: "Electronics",
      price: 499,
      description: "LCD module for microcontroller-based display projects.",
      relatedProductIds: [40, 33],
      tags: ["LCD", "display", "electronics"],
    },
    {
      id: 40,
      name: "Arduino UNO",
      img: assets.ArduinoUNOboard,
      category: "Electronics",
      price: 1450,
      description:
        "Popular Arduino UNO board for beginner to advanced electronics.",
      relatedProductIds: [32, 33, 35],
      tags: ["arduino", "microcontroller", "UNO"],
    },
  ];

  return (
    <MyContext.Provider
      value={{
        productsData,
        toggleCart,
        setToggleCart,
        popCart,
        setPopCart,
        cartItems,
        setCartItems,
        addTo,
        setAddTo,
        filteredProducts,
        toggleMSearch,
        setToggleMSearch,
        toggleLogin,
        setToggleLogin,
        pageContent,
        toggleLog,
        setToggleLog,
        isLoggedIn,
        setIsLoggedIn,
        handleAddToCart,
        handleDecreaseQty
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
