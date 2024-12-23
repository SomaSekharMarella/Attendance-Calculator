import React from 'react';
import './Footer.css'; // Make sure to create and style the Footer.css file

const Footer = () => {
  return (
    <div className="footer">
      <p>
        View the source code <a href="https://github.com/SomaSekharMarella/Attendance-Calculator" target="_blank" rel="noopener noreferrer" className="text-blue-500">here</a>.
      </p>
      <p className="text-gray-600">
        Developed by <strong>Somuu</strong> &nbsp; | &nbsp; Made with ❤️
      </p>
    </div>
  );
};

export default Footer;
