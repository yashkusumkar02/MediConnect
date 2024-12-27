import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/UserContext'; // Adjust the path as necessary
import Hospital from './Hospitals';
import axios from 'axios';

const SearchSection = () => {
  // Sample data for hospitals with added details
  const defaultHospitals = [
    {
        name: 'City Hospital',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        address: '123 Mumbai Street',
        specDrName: 'A. Sharma',
        specialist: 'Cardiologist',
        experience: 15,
        openingHours: '9:00 AM - 6:00 PM',
        doctorImage: 'https://www.saifeehospital.com/img/slides/slide1.jpg',
        languagesSpoken: 'English, Hindi',
        degree: 'MBBS, MD'
    },
    {
        name: 'Sunshine Hospital',
        city: 'Delhi',
        state: 'Delhi',
        zipCode: '110001',
        address: '456 Delhi Avenue',
        specDrName: 'B. Singh',
        specialist: 'Orthopedic',
        experience: 10,
        openingHours: '10:00 AM - 8:00 PM',
        doctorImage: 'https://sunshinehospital.co/assets/images/Gallery/Hospital-Front-Main.jpg',
        languagesSpoken: 'English, Hindi',
        degree: 'MBBS, MS'
    },
    {
        name: 'Apollo Hospital',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        address: '789 Bangalore Road',
        specDrName: 'C. Rao',
        specialist: 'Neurologist',
        experience: 20,
        openingHours: '8:00 AM - 5:00 PM',
        doctorImage: 'https://safartibbi.com/wp-content/uploads/2024/05/apollo.jpg',
        languagesSpoken: 'English, Kannada',
        degree: 'MBBS, DM Neurology'
    },
    {
        name: 'Santa Cruise Valley Hospital',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400002',
        address: '101 Mumbai Lane',
        specDrName: 'D. Patil',
        specialist: 'Dermatologist',
        experience: 12,
        openingHours: '9:00 AM - 6:00 PM',
        doctorImage: 'https://www.guptasen.com/wp-content/uploads/2024/03/Artteza-Towers-Santacruz-West.webp',
        languagesSpoken: 'English, Marathi',
        degree: 'MBBS, MD Dermatology'
    },
    {
        name: 'Care Hospital',
        city: 'Pune',
        state: 'Maharashtra',
        zipCode: '411001',
        address: '121 Pune Street',
        specDrName: 'E. Desai',
        specialist: 'Pediatrician',
        experience: 8,
        openingHours: '8:30 AM - 6:00 PM',
        doctorImage: 'https://www.puneinsight.com/wp-content/uploads/2020/06/care-main.jpg',
        languagesSpoken: 'English, Marathi',
        degree: 'MBBS, DCH'
    },
    {
        name: 'Metro Hospital',
        city: 'Hyderabad',
        state: 'Telangana',
        zipCode: '500001',
        address: '1234 Hyderabad Road',
        specDrName: 'F. Reddy',
        specialist: 'General Surgeon',
        experience: 14,
        openingHours: '7:00 AM - 5:00 PM',
        doctorImage: 'https://images1-fabric.practo.com/5555cd34516ec6512bd43d9caa6e02c990b0a82652dca.jpg',
        languagesSpoken: 'English, Telugu',
        degree: 'MBBS, MS General Surgery'
    },
    {
        name: 'Fortis Hospital',
        city: 'Chennai',
        state: 'Tamil Nadu',
        zipCode: '600001',
        address: '543 Chennai Blvd',
        specDrName: 'G. Iyer',
        specialist: 'Orthopedic Surgeon',
        experience: 18,
        openingHours: '10:00 AM - 7:00 PM',
        doctorImage: 'https://www.bizzbuzz.news/h-upload/2023/11/25/1820020-fortis.webp',
        languagesSpoken: 'English, Tamil',
        degree: 'MBBS, MS Orthopedics'
    },
    {
        name: 'Max Health Care',
        city: 'Delhi',
        state: 'Delhi',
        zipCode: '110002',
        address: '678 Delhi Avenue',
        specDrName: 'H. Kapur',
        specialist: 'ENT Specialist',
        experience: 11,
        openingHours: '9:00 AM - 5:00 PM',
        doctorImage: 'https://d35oenyzp35321.cloudfront.net/Max_Super_Speciality_Hospital_Shalimar_Bagh_jpg_5c1758d700.jpg',
        languagesSpoken: 'English, Hindi',
        degree: 'MBBS, MS ENT'
    },
    {
        name: 'Lotus Hospital',
        city: 'Jaipur',
        state: 'Rajasthan',
        zipCode: '302001',
        address: '333 Jaipur Lane',
        specDrName: 'I. Singh',
        specialist: 'Gynecologist',
        experience: 16,
        openingHours: '8:00 AM - 4:00 PM',
        doctorImage: 'https://cdn.hexahealth.com/Image/cb8ab721-b3fe-4270-908d-0e61d2d9a7de.jpg',
        languagesSpoken: 'English, Hindi',
        degree: 'MBBS, MD Obstetrics & Gynecology'
    },
    {
        name: 'Medanta Hospital',
        city: 'Gurgaon',
        state: 'Haryana',
        zipCode: '122001',
        address: '451 Gurgaon Circle',
        specDrName: 'J. Gupta',
        specialist: 'Oncologist',
        experience: 19,
        openingHours: '9:00 AM - 6:30 PM',
        doctorImage: 'https://upload.wikimedia.org/wikipedia/en/6/68/Medanta_the_medicity_hospital.jpg',
        languagesSpoken: 'English, Hindi',
        degree: 'MBBS, MD Oncology'
    },
    {
        name: 'Rainbow Hospital',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400003',
        address: '159 Rainbow Ave',
        specDrName: 'K. Mehta',
        specialist: 'Pediatrician',
        experience: 7,
        openingHours: '8:30 AM - 5:00 PM',
        doctorImage: 'https://images1-fabric.practo.com/rainbow-children-s-multispecialty-clinic-mumbai-1483344465-586a0a5160419.JPG',
        languagesSpoken: 'English, Marathi',
        degree: 'MBBS, DCH'
    },
    {
        name: 'Ruby Hall Clinic',
        city: 'Pune',
        state: 'Maharashtra',
        zipCode: '411002',
        address: '256 Pune Street',
        specDrName: 'L. Naik',
        specialist: 'Radiologist',
        experience: 13,
        openingHours: '9:00 AM - 7:00 PM',
        doctorImage: 'https://images1-fabric.practo.com/rainbow-children-s-multispecialty-clinic-mumbai-1483344465-586a0a5160419.JPG',
        languagesSpoken: 'English, Marathi',
        degree: 'MBBS, MD Radiology'
    },
    {
        name: 'Narayana Health',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560002',
        address: '101 Narayana Road',
        specDrName: 'M. Kumar',
        specialist: 'Cardiologist',
        experience: 20,
        openingHours: '8:00 AM - 4:00 PM',
        doctorImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Narayana_Institute_of_Cardiac_Sciences%2C_Bangalore%2C_Karnataka%2C_India_%282014%29.jpg/640px-Narayana_Institute_of_Cardiac_Sciences%2C_Bangalore%2C_Karnataka%2C_India_%282014%29.jpg',
        languagesSpoken: 'English, Kannada',
        degree: 'MBBS, DM Cardiology'
    },
    {
        name: 'AIMS Hospital',
        city: 'Kolkata',
        state: 'West Bengal',
        zipCode: '700001',
        address: '321 Kolkata Road',
        specDrName: 'N. Banerjee',
        specialist: 'Endocrinologist',
        experience: 22,
        openingHours: '10:00 AM - 5:00 PM',
        doctorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsz-nXUx7s6u6ApkleAKLuJKsZBzJoKoKR-w&s',
        languagesSpoken: 'English, Bengali',
        degree: 'MBBS, MD Endocrinology'
    },
    {
        name: 'Sri Ramachandra Hospital',
        city: 'Chennai',
        state: 'Tamil Nadu',
        zipCode: '600002',
        address: '789 Ramachandra Lane',
        specDrName: 'O. Subramanian',
        specialist: 'Urologist',
        experience: 25,
        openingHours: '9:00 AM - 5:00 PM',
        doctorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLMFRi94FMQFAA657L5Mt-jTH48Nj_Y7emuw&s',
        languagesSpoken: 'English, Tamil',
        degree: 'MBBS, MS Urology'
    },
    {
      name: 'St. John\'s Medical Center',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560003',
      address: '123 St. John\'s Road',
      specDrName: 'P. Iyer',
      specialist: 'Ophthalmologist',
      experience: 15,
      openingHours: '8:00 AM - 6:00 PM',
      doctorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRpV87VafapRkvWeymOQjF9PW-FDQ6bwOnHA&s',
      languagesSpoken: 'English, Kannada',
      degree: 'MBBS, MS Ophthalmology'
  },
  {
      name: 'Saket City Hospital',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110003',
      address: '100 Saket Avenue',
      specDrName: 'Q. Mehra',
      specialist: 'Psychiatrist',
      experience: 12,
      openingHours: '10:00 AM - 7:00 PM',
      doctorImage: 'https://images1-fabric.practo.com/saket-city-hospital-delhi-1475413314-57f10542d8dc1.jpg',
      languagesSpoken: 'English, Hindi',
      degree: 'MBBS, MD Psychiatry'
  },
  {
      name: 'Cure Hospital',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500002',
      address: '87 Cure Lane',
      specDrName: 'R. Kumar',
      specialist: 'Nephrologist',
      experience: 18,
      openingHours: '9:00 AM - 6:00 PM',
      doctorImage: 'https://content3.jdmagicbox.com/comp/rangareddy/x3/040pxx40.xx40.191215215505.c2x3/catalogue/cure-hospitals-pocharam-rangareddy-multispeciality-hospitals-2j6vjak0oh.jpg',
      languagesSpoken: 'English, Telugu',
      degree: 'MBBS, DM Nephrology'
  },
  {
      name: 'Shanti Nursing Home',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600003',
      address: '234 Shanti Street',
      specDrName: 'S. Reddy',
      specialist: 'General Physician',
      experience: 25,
      openingHours: '8:00 AM - 6:00 PM',
      doctorImage: 'https://images1-fabric.practo.com/practices/679642/shanthi-hospital-chennai-666e4e8a5a276.png',
      languagesSpoken: 'English, Tamil',
      degree: 'MBBS, MD General Medicine'
  },
  {
      name: 'Vasundhara Hospital',
      city: 'Pune',
      state: 'Maharashtra',
      zipCode: '411003',
      address: '456 Vasundhara Lane',
      specDrName: 'T. Shah',
      specialist: 'Gastroenterologist',
      experience: 10,
      openingHours: '9:00 AM - 5:00 PM',
      doctorImage: 'https://cdn.worldclinics.net/clinic/large/jpg/vasundhara-hospital-1.jpg',
      languagesSpoken: 'English, Marathi',
      degree: 'MBBS, MD Gastroenterology'
  }
];
const [searchTerm, setSearchTerm] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]); // New state to hold the full list of hospitals
  const { clientInfo } = useContext(UserContext);
  const isLoggedIn = !!clientInfo;

  useEffect(() => {
    const fetchHospitals = async () => {
      const token = localStorage.getItem('token');

      if (isLoggedIn) {
        try {
          const response = await axios.get(
            // 'http://localhost:3000/api/hospitals/find-hospital'
            `${import.meta.env.VITE_API_BASE_URL_HOSPITAL}/find-hospital`

            , {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (Array.isArray(response.data)) {
            setAllHospitals(response.data); // Save the full list of hospitals
            setFilteredHospitals(response.data); // Display the full list initially
          } else {
            setAllHospitals([]); 
            setFilteredHospitals([]);
          }
        } catch (error) {
          toast.error('Failed to fetch hospitals. Please try again later.');
          setAllHospitals([]);
          setFilteredHospitals([]);
          console.log(error);
        }
      } else {
        // For non-logged-in users, display default sample hospitals
        setAllHospitals(defaultHospitals);
        setFilteredHospitals(defaultHospitals.slice(0, 3));
      }
    };

    fetchHospitals();
  }, [isLoggedIn]);

  const handleSearch = () => {
    const cityToSearch = searchTerm.trim().toLowerCase();

    if (!cityToSearch) {
      // Reset the display to the full list of hospitals or default hospitals
      setFilteredHospitals(isLoggedIn ? allHospitals : defaultHospitals.slice(0, 3));
      return;
    }

    // Filter from the original list of hospitals
    const results = allHospitals.filter((hospital) =>
      hospital.city.toLowerCase().includes(cityToSearch)
    );

    if (results.length === 0) {
      toast.error(`No hospitals found in "${searchTerm}"`);
      setFilteredHospitals([]);
    } else {
      setFilteredHospitals(results);
    }

    setSearchTerm('');  // Clear the search input
  };

  return (
    <div className="flex flex-col items-center h-auto bg-cover bg-center text-white py-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-4 text-black">Find Hospitals in Your City</h1>

      {/* Search Input Section */}
      <div className="flex w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="Enter city name (e.g., Mumbai)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md text-gray-900"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Info Message */}
      <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
        {isLoggedIn
          ? ''
          : 'You are viewing limited data. For Booking the Hospital Appointment, Please Signup/Login.'}
      </h3>

      {/* Search Results */}
      <div className="w-full max-w-4xl px-4 space-y-4">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital, index) => (
            <Hospital key={index} hospital={hospital} isLoggedIn={isLoggedIn} clientInfo={clientInfo} />
          ))
        ) : (
          <p className="text-lg font-semibold text-gray-700 bg-white p-4 rounded-md shadow-md">
            No hospitals found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchSection;