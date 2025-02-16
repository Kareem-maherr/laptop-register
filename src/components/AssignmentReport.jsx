import { useRef } from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';

const AssignmentReport = ({ device, employee }) => {
  const handleDownload = () => {
    const content = document.getElementById('download_section');
    
    // Create a temporary container with styles
    const container = document.createElement('div');
    
    // Add base styles first
    const baseStyle = document.createElement('style');
    baseStyle.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap');
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Nunito Sans', sans-serif;
        line-height: 1.5;
        color: #111111;
      }
    `;
    container.appendChild(baseStyle);
    
    // Add your custom styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /*
Template Name: Invar
Template URL: http://themeholy.com/html/Invar
Description: Invar - Invoice HTML Template
Author: themeholy
Author URI: https://themeforest.net/user/themeholy
Version: 1.0.0
*/
/*=================================
    CSS Index Here
==================================*/
/*

01. Theme Base
    1.1. Variable
    1.2. Mixin
    1.3. Typography
    1.4. Container
    1.5. Grid
02. Theme Templates
    2.1. Global Style 
    2.2. Template 1

/*=================================
   01. Theme Base
==================================*/
/*------------------- 1.1. Variable-------------------*/
:root {
  --theme-color: #2D7CFE;
  --title-color: #111111;
  --body-color: #6E6E6E;
  --smoke-color: #f3f3f3;
  --smoke-dark: #E1ECFF;
  --black-color: #000000;
  --white-color: #ffffff;
  --light-color: #72849B;
  --border-color: #C4C4C4;
  --title-font: 'Nunito Sans', sans-serif;
  --body-font: 'Nunito Sans', sans-serif;
  --main-container: 1380px;
  --container-gutters: 24px;
  --section-space: 50px;
  --section-title-space: 70px;
  --ripple-ani-duration: 5s;
}

.restaurant-template {
  --theme-color: #EE1C25;
}

.photography-template {
  --theme-color: #FB9F0D;
}

.electronics-template,
.it-template {
  --theme-color: #557497;
}

.hall-template {
  --theme-color: #1A8E5F;
}

.train-template {
  --theme-color: #7539FF;
}

.hospital-template {
  --theme-color: #01B3F2;
}

.hosting-template {
  --theme-color: #3865EF;
}

.zoo-template {
  --theme-color: #00C764;
}

.stadium-template {
  --theme-color: #B22C19;
}

/*------------------- 1.2. Mixin -------------------*/
@use "sass:math";
/*------------------- 1.3. Typography -------------------*/
html,
body {
  scroll-behavior: auto !important;
}

body {
  font-family: var(--title-font);
  font-size: 14px;
  font-weight: 400;
  color: var(--body-color);
  line-height: 22px;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  background-color: #dbdbdb;
}

iframe {
  border: none;
  width: 100%;
}

.slick-slide:focus,
button:focus,
a:focus,
a:active,
input,
input:hover,
input:focus,
input:active,
textarea,
textarea:hover,
textarea:focus,
textarea:active {
  outline: none;
}

input:focus {
  outline: none;
  box-shadow: none;
}

img:not([draggable]),
embed,
object,
video {
  max-width: 100%;
  height: auto;
}

ul {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
}

table {
  margin: 0 0 1.5em;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid var(--border-color);
}

th {
  font-weight: 700;
  color: var(--title-color);
}

td,
th {
  border: 1px solid var(--border-color);
  padding: 9px 12px;
}

a {
  color: var(--theme-color);
  text-decoration: none;
  outline: 0;
  -webkit-transition: all ease 0.4s;
  transition: all ease 0.4s;
}

a:hover {
  color: var(--title-color);
}

a:active, a:focus, a:hover, a:visited {
  text-decoration: none;
  outline: 0;
}

button {
  -webkit-transition: all ease 0.4s;
  transition: all ease 0.4s;
}

img {
  border: none;
  max-width: 100%;
}

ins {
  text-decoration: none;
}

pre {
  font-family: var(--body-font);
  background: #f5f5f5;
  color: #666;
  font-size: 14px;
  margin: 20px 0;
  overflow: auto;
  padding: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

span.ajax-loader:empty,
p:empty {
  display: none;
}

p {
  font-family: var(--body-font);
  margin: 0 0 18px 0;
  color: var(--body-color);
  line-height: 1.571;
}

h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a,
p a,
span a {
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.h1,
h1,
.h2,
h2,
.h3,
h3,
.h4,
h4,
.h5,
h5,
.h6,
h6 {
  font-family: var(--title-font);
  color: var(--title-color);
  text-transform: none;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 15px 0;
}

.h1,
h1 {
  font-size: 60px;
  line-height: 1.167;
}

.h2,
h2 {
  font-size: 48px;
  line-height: 1.208;
}

.h3,
h3 {
  font-size: 36px;
  line-height: 1.278;
}

.h4,
h4 {
  font-size: 30px;
  line-height: 1.333;
  font-weight: 600;
}

.h5,
h5 {
  font-size: 24px;
  line-height: 1.417;
  font-weight: 600;
}

.h6,
h6 {
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
}

/* Medium Large devices */
@media (max-width: 1399px) {
  .h1,
  h1 {
    font-size: 48px;
  }
  .h2,
  h2 {
    font-size: 40px;
  }
}

/* Large devices */
@media (max-width: 1199px) {
  .h1,
  h1 {
    font-size: 40px;
  }
  .h2,
  h2 {
    font-size: 36px;
  }
  .h3,
  h3 {
    font-size: 30px;
  }
  .h4,
  h4 {
    font-size: 24px;
  }
  .h5,
  h5 {
    font-size: 20px;
  }
  .h6,
  h6 {
    font-size: 16px;
  }
}

/* Small devices */
@media (max-width: 767px) {
  .h1,
  h1 {
    font-size: 40px;
  }
  .h2,
  h2 {
    font-size: 28px;
  }
  .h3,
  h3 {
    font-size: 26px;
  }
  .h4,
  h4 {
    font-size: 22px;
  }
  .h5,
  h5 {
    font-size: 18px;
  }
  .h6,
  h6 {
    font-size: 16px;
  }
}

/* Extra small devices */
@media (max-width: 575px) {
  .h1,
  h1 {
    font-size: 34px;
    line-height: 1.3;
  }
}

/* Extra small devices */
@media (max-width: 375px) {
  .h1,
  h1 {
    font-size: 32px;
  }
}

/*------------------- 1.4. Container -------------------*/
/* Medium Large devices */
@media (max-width: 1399px) {
  :root {
    --main-container: 850px;
  }
}

.invoice-container {
  width: 880px;
  padding: 20px 15px;
  margin: 15px auto;
  position: relative;
  z-index: 5;
}

.invoice-container-wrap {
  overflow: auto;
}

/*------------------- 1.5. Grid -------------------*/
.slick-track > [class*=col] {
  -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
          flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x)/ 2);
  padding-left: calc(var(--bs-gutter-x)/ 2);
  margin-top: var(--bs-gutter-y);
}

.gy-30 {
  --bs-gutter-y: 30px;
}

.gy-40 {
  --bs-gutter-y: 40px;
}

.gy-50 {
  --bs-gutter-y: 50px;
}

.gx-10 {
  --bs-gutter-x: 10px;
}

@media (min-width: 1500px) {
  .gx-60 {
    --bs-gutter-x: 60px;
  }
}

@media (min-width: 1399px) {
  .gx-30 {
    --bs-gutter-x: 30px;
  }
  .gx-25 {
    --bs-gutter-x: 25px;
  }
  .gx-40 {
    --bs-gutter-x: 40px;
  }
}

/* Medium devices */
@media (max-width: 991px) {
  .gy-50 {
    --bs-gutter-y: 40px;
  }
}

/*------------------- 1.6. Spacing -------------------*/
/*-- Padding Left And Right --*/
.px-5 {
  padding-right: 5px;
  padding-left: 5px;
}

.px-10 {
  padding-right: 10px;
  padding-left: 10px;
}

.px-15 {
  padding-right: 15px;
  padding-left: 15px;
}

.px-20 {
  padding-right: 20px;
  padding-left: 20px;
}

.px-25 {
  padding-right: 25px;
  padding-left: 25px;
}

.px-30 {
  padding-right: 30px;
  padding-left: 30px;
}

.px-35 {
  padding-right: 35px;
  padding-left: 35px;
}

.px-40 {
  padding-right: 40px;
  padding-left: 40px;
}

.px-45 {
  padding-right: 45px;
  padding-left: 45px;
}

.px-50 {
  padding-right: 50px;
  padding-left: 50px;
}

/*-- Padding Top And Bottom --*/
.py-5 {
  padding-top: 5px;
  padding-bottom: 5px;
}

.py-10 {
  padding-top: 10px;
  padding-bottom: 10px;
}

.py-15 {
  padding-top: 15px;
  padding-bottom: 15px;
}

.py-20 {
  padding-top: 20px;
  padding-bottom: 20px;
}

.py-25 {
  padding-top: 25px;
  padding-bottom: 25px;
}

.py-30 {
  padding-top: 30px;
  padding-bottom: 30px;
}

.py-35 {
  padding-top: 35px;
  padding-bottom: 35px;
}

.py-40 {
  padding-top: 40px;
  padding-bottom: 40px;
}

.py-45 {
  padding-top: 45px;
  padding-bottom: 45px;
}

.py-50 {
  padding-top: 50px;
  padding-bottom: 50px;
}

/*-- Padding Top --*/
.pt-5 {
  padding-top: 5px;
}

.pt-10 {
  padding-top: 10px;
}

.pt-15 {
  padding-top: 15px;
}

.pt-20 {
  padding-top: 20px;
}

.pt-25 {
  padding-top: 25px;
}

.pt-30 {
  padding-top: 30px;
}

.pt-35 {
  padding-top: 35px;
}

.pt-40 {
  padding-top: 40px;
}

.pt-45 {
  padding-top: 45px;
}

.pt-50 {
  padding-top: 50px;
}

/*-- Padding Bottom --*/
.pb-5 {
  padding-bottom: 5px;
}

.pb-10 {
  padding-bottom: 10px;
}

.pb-15 {
  padding-bottom: 15px;
}

.pb-20 {
  padding-bottom: 20px;
}

.pb-25 {
  padding-bottom: 25px;
}

.pb-30 {
  padding-bottom: 30px;
}

.pb-35 {
  padding-bottom: 35px;
}

.pb-40 {
  padding-bottom: 40px;
}

.pb-45 {
  padding-bottom: 45px;
}

.pb-50 {
  padding-bottom: 50px;
}

/*-- Padding Left --*/
.pl-5 {
  padding-left: 5px;
}

.pl-10 {
  padding-left: 10px;
}

.pl-15 {
  padding-left: 15px;
}

.pl-20 {
  padding-left: 20px;
}

.pl-25 {
  padding-left: 25px;
}

.pl-30 {
  padding-left: 30px;
}

.pl-35 {
  padding-left: 35px;
}

.pl-40 {
  padding-left: 40px;
}

.pl-45 {
  padding-left: 45px;
}

.pl-50 {
  padding-left: 50px;
}

/*-- Padding Right --*/
.pr-5 {
  padding-right: 5px;
}

.pr-10 {
  padding-right: 10px;
}

.pr-15 {
  padding-right: 15px;
}

.pr-20 {
  padding-right: 20px;
}

.pr-25 {
  padding-right: 25px;
}

.pr-30 {
  padding-right: 30px;
}

.pr-35 {
  padding-right: 35px;
}

.pr-40 {
  padding-right: 40px;
}

.pr-45 {
  padding-right: 45px;
}

.pr-50 {
  padding-right: 50px;
}

/*-- margin Left And Right --*/
.mx-5 {
  margin-right: 5px;
  margin-left: 5px;
}

.mx-10 {
  margin-right: 10px;
  margin-left: 10px;
}

.mx-15 {
  margin-right: 15px;
  margin-left: 15px;
}

.mx-20 {
  margin-right: 20px;
  margin-left: 20px;
}

.mx-25 {
  margin-right: 25px;
  margin-left: 25px;
}

.mx-30 {
  margin-right: 30px;
  margin-left: 30px;
}

.mx-35 {
  margin-right: 35px;
  margin-left: 35px;
}

.mx-40 {
  margin-right: 40px;
  margin-left: 40px;
}

.mx-45 {
  margin-right: 45px;
  margin-left: 45px;
}

.mx-50 {
  margin-right: 50px;
  margin-left: 50px;
}

/*-- margin Top And Bottom --*/
.my-5 {
  margin-top: 5px;
  margin-bottom: 5px;
}

.my-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.my-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}

.my-20 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.my-25 {
  margin-top: 25px;
  margin-bottom: 25px;
}

.my-30 {
  margin-top: 30px;
  margin-bottom: 30px;
}

.my-35 {
  margin-top: 35px;
  margin-bottom: 35px;
}

.my-40 {
  margin-top: 40px;
  margin-bottom: 40px;
}

.my-45 {
  margin-top: 45px;
  margin-bottom: 45px;
}

.my-50 {
  margin-top: 50px;
  margin-bottom: 50px;
}

/*-- margin Top --*/
.mt-5 {
  margin-top: 5px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-15 {
  margin-top: 15px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-25 {
  margin-top: 25px;
}

.mt-30 {
  margin-top: 30px;
}

.mt-35 {
  margin-top: 35px;
}

.mt-40 {
  margin-top: 40px;
}

.mt-45 {
  margin-top: 45px;
}

.mt-50 {
  margin-top: 50px;
}

/*-- margin Bottom --*/
.mb-5 {
  margin-bottom: 5px;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-15 {
  margin-bottom: 15px;
}

.mb-20 {
  margin-bottom: 20px;
}

.mb-25 {
  margin-bottom: 25px;
}

.mb-30 {
  margin-bottom: 30px;
}

.mb-35 {
  margin-bottom: 35px;
}

.mb-40 {
  margin-bottom: 40px;
}

.mb-45 {
  margin-bottom: 45px;
}

.mb-50 {
  margin-bottom: 50px;
}

/*-- margin Left --*/
.ml-5 {
  margin-left: 5px;
}

.ml-10 {
  margin-left: 10px;
}

.ml-15 {
  margin-left: 15px;
}

.ml-20 {
  margin-left: 20px;
}

.ml-25 {
  margin-left: 25px;
}

.ml-30 {
  margin-left: 30px;
}

.ml-35 {
  margin-left: 35px;
}

.ml-40 {
  margin-left: 40px;
}

.ml-45 {
  margin-left: 45px;
}

.ml-50 {
  margin-left: 50px;
}

/*-- margin Right --*/
.mr-5 {
  margin-right: 5px;
}

.mr-10 {
  margin-right: 10px;
}

.mr-15 {
  margin-right: 15px;
}

.mr-20 {
  margin-right: 20px;
}

.mr-25 {
  margin-right: 25px;
}

.mr-30 {
  margin-right: 30px;
}

.mr-35 {
  margin-right: 35px;
}

.mr-40 {
  margin-right: 40px;
}

.mr-45 {
  margin-right: 45px;
}

.mr-50 {
  margin-right: 50px;
}

.mb-60 {
  margin-bottom: 60px;
}

.mt-n1 {
  margin-top: -.25rem;
}

.mt-n2 {
  margin-top: -.6rem;
}

.mt-n3 {
  margin-top: -1rem;
}

.mt-n4 {
  margin-top: -1.5rem;
}

.mt-n5 {
  margin-top: -3rem;
}

.mb-n1 {
  margin-bottom: -.25rem;
}

.mb-n2 {
  margin-bottom: -.6rem;
}

.mb-n3 {
  margin-bottom: -1rem;
}

.mb-n4 {
  margin-bottom: -1.5rem;
}

.mb-n5 {
  margin-bottom: -3rem;
}

.space,
.space-top {
  padding-top: var(--section-space);
}

.space,
.space-bottom {
  padding-bottom: var(--section-space);
}

/*=================================
   02. Theme Templates
==================================*/
/*------------------- 2.1. Global Style -------------------*/
/* Global Style ---------------------------------- */
.invoice-number,
.invoice-date {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
  width: var(--info-width, 222px);
}

.th-invoice {
  position: relative;
  z-index: 4;
  background-color: var(--white-color);
}

.th-invoice .download-inner {
  padding: 50px;
}

.th-invoice b {
  color: var(--title-color);
}

.th-invoice .big-title {
  font-size: 44px;
  text-transform: uppercase;
  margin-bottom: 0;
  text-align: right;
  font-weight: 800;
}

.th-invoice .header-bottom {
  margin-top: 22px;
  margin-bottom: 19px;
}

.th-invoice .invoice-left b,
.th-invoice .invoice-right b {
  font-size: 18px;
  font-weight: 700;
}

.th-invoice .invoice-left.text-white p, .th-invoice .invoice-left.text-white b,
.th-invoice .invoice-right.text-white p,
.th-invoice .invoice-right.text-white b {
  color: var(--white-color);
}

.th-invoice address {
  margin-bottom: 0;
}

.invoice-right {
  text-align: right;
}

.invoice-table {
  border: none;
  margin-bottom: 25px;
}

.invoice-table th {
  color: var(--title-color);
}

.invoice-table th,
.invoice-table td {
  padding: 13px 20px;
  border: none;
}

.invoice-table th:first-child,
.invoice-table td:first-child {
  width: 56px;
}

.invoice-table th:nth-last-child(-n + 3),
.invoice-table td:nth-last-child(-n + 3) {
  width: 108px;
}

.invoice-table th:last-child,
.invoice-table td:last-child {
  text-align: right;
}

.invoice-table tr {
  border-bottom: 1px solid var(--border-color);
  position: relative;
}

.invoice-table thead tr {
  border-bottom: none;
}

.invoice-table th {
  background-color: var(--theme-color);
  color: var(--white-color);
  font-size: 16px;
}

.invoice-table th:first-child {
  border-radius: 0;
}

.invoice-table th:last-child {
  border-radius: 0;
}

.invoice-table tfoot td,
.invoice-table tfoot th {
  text-align: right !important;
}

.invoice-table.td-big tbody td {
  padding: 23px 20px;
}

.invoice-table.style2 thead th, .invoice-table.style2 thead td {
  background: -webkit-linear-gradient(bottom, #21171F 0%, #3E4049 100%);
  background: linear-gradient(0deg, #21171F 0%, #3E4049 100%);
}

.invoice-table.style2 tbody td {
  padding: 23px 20px;
  background-color: #F5F5F5;
}

.invoice-table.style2 tr {
  border-bottom: 1px solid var(--white-color);
}

.invoice-table.mb-30 {
  margin-bottom: 30px;
}

.table-stripe thead th,
.table-stripe thead td {
  background-color: var(--smoke-dark);
}

.table-stripe tr {
  border-bottom: none;
}

.table-stripe tr:nth-child(2n) th,
.table-stripe tr:nth-child(2n) td {
  background-color: var(--smoke-color);
}

.table-stripe tr:nth-child(2n) th:first-child,
.table-stripe tr:nth-child(2n) td:first-child {
  border-radius: 0;
}

.table-stripe tr:nth-child(2n) th:last-child,
.table-stripe tr:nth-child(2n) td:last-child {
  border-radius: 0;
}

.table-style1 {
  border: 1px solid var(--smoke-color);
  margin-top: -10px;
}

.table-style1 tr th, .table-style1 tr td {
  text-align: left !important;
  border-radius: 0 !important;
  border-bottom: 1px solid var(--smoke-color);
  width: 32.90%;
}

.table-style1 thead {
  background-color: var(--smoke-color);
}

.table-style1 thead th, .table-style1 thead td {
  border-right: 1px solid var(--border-color);
}

.table-style1 thead th:last-child, .table-style1 thead td:last-child {
  border-right: none;
}

.table-style2 b, .table-style2 th {
  font-weight: 600;
}

.table-style2 th, .table-style2 td {
  border-radius: 0 !important;
  border-right: 1px solid var(--smoke-color);
  padding: 4px 20px;
}

.table-style2 th:first-child, .table-style2 td:first-child {
  border-left: 1px solid var(--smoke-color);
}

.table-style2 td {
  font-size: 12px;
}

.table-style2 td:last-child {
  text-align: left;
}

.table-style2 tr {
  border-bottom: none;
}

.table-style2 tr:last-child {
  border-bottom: 1px solid var(--smoke-color);
}

.table-style2 tr:last-child th, .table-style2 tr:last-child td {
  padding-bottom: 15px;
}

.table-style2 tr:first-child {
  border-top: 1px solid var(--smoke-color);
}

.table-style2 tr:first-child th, .table-style2 tr:first-child td {
  padding-top: 15px;
}

.total-table {
  border: none;
  margin-bottom: 0;
  margin-top: -4px;
}

.total-table th {
  font-size: 18px;
}

.total-table th,
.total-table td {
  border: none;
  padding: 4px 20px;
}

.total-table th:nth-child(2),
.total-table td:nth-child(2) {
  text-align: right;
}

.total-table tr:last-child {
  border-top: 1px solid var(--border-color);
}

.total-table tr:last-child th,
.total-table tr:last-child td {
  padding: 15px 20px;
}

.total-table tr:nth-last-child(2) th,
.total-table tr:nth-last-child(2) td {
  padding: 4px 20px 16px 20px;
}

hr.style1 {
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: var(--border-color);
  opacity: 1;
}

.table-title {
  font-size: 18px;
  margin-bottom: 7px;
}

.text-title {
  color: var(--title-color);
  font-weight: 500;
}

.invoice-note {
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
}

.invoice-note svg {
  margin-right: 5px;
  margin-top: -3px;
}

.invoice-note b {
  margin-right: 5px;
}

.invoice-note2 {
  margin-right: 3px;
}

.background-image {
  background-size: 100% 100%;
}

.body-shape1,
.body-shape2,
.body-shape3,
.body-shape4 {
  position: absolute;
  z-index: -1;
  left: 0;
}

.body-shape1 img,
.body-shape2 img,
.body-shape3 img,
.body-shape4 img {
  width: 100%;
}

.invoice-buttons {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  gap: 3px;
  padding: 3px;
  overflow: hidden;
  margin-top: 45px;
  position: relative;
  top: -50px;
  background-color: var(--white-color);
  box-shadow: 0px 0px 15px rgba(119, 119, 119, 0.25);
  border-radius: 10px;
  max-width: 129px;
  margin-left: auto;
  margin-right: auto;
}

.invoice-buttons a,
.invoice-buttons button {
  border: none;
  height: 46px;
  width: 60px;
  line-height: 44px;
  text-align: center;
  border-radius: 7px 0 0 7px;
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  background-color: transparent;
  position: relative;
  z-index: 2;
}

.invoice-buttons a::before,
.invoice-buttons button::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--theme-color);
  opacity: 0.25;
  border-radius: inherit;
  z-index: -1;
  -webkit-transition: 0.4s ease-in-out;
  transition: 0.4s ease-in-out;
}

.invoice-buttons a svg path,
.invoice-buttons button svg path {
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.invoice-buttons a:hover:before,
.invoice-buttons button:hover:before {
  opacity: 1;
  background-color: var(--title-color);
}

.invoice-buttons a:hover svg path,
.invoice-buttons button:hover svg path {
  fill: #fff;
}

.invoice-buttons .download_btn {
  border-radius: 0 7px 7px 0;
}

.invoice-buttons .download_btn:before {
  opacity: 1;
}

.invoice-buttons .download_btn:hover:before {
  background-color: var(--title-color);
}

.body-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.body-bg img {
  height: 100%;
  width: 100%;
}

/* For remove URL and Page Number -------*/
@media print {
  .invoice-buttons {
    opacity: 0 !important;
  }
  .th-invoice .download-inner {
    padding: 0;
    padding-top: 40px;
  }
  .invoice-container {
    width: 100%;
    max-width: 880px;
  }
  .invoice-container-wrap {
    overflow-x: hidden;
  }
  .invoice_style2 .body-shape2 {
    bottom: -50px;
  }
  .invoice-table th {
    color: black !important;
  }
  .invoice-table tr {
    border-color: #e6e6e6 !important;
  }
  .invoice-table th, .invoice-table td {
    border: 1px solid #e6e6e6 !important;
    border-color: #e6e6e6 !important;
  }
}

/*------------------- 2.2. Template 1 -------------------*/
/* Template 1 ---------------------------------- */
.invoice_style1 {
  padding-bottom: 1px;
}

.invoice-number {
  margin-bottom: 0;
}

.invoice-date {
  margin-bottom: 0;
}

.invoice_style1 {
  padding-bottom: 36px;
}

.invoice_style1 .logo-shape {
  position: absolute;
  right: 0;
  top: 20px;
  z-index: -3;
}

.invoice_style1 .right-shape {
  position: absolute;
  right: 0;
  top: 93px;
  z-index: -1;
}

.invoice_style1 .left-shape {
  position: absolute;
  top: 93px;
  left: 0;
  z-index: -1;
}

.invoice_style1 .header-logo {
  margin-top: -17px;
}

.invoice_style1 .big-title {
  font-size: 54px;
  color: var(--white-color);
  margin-top: 8px;
}

.invoice_style1 .invoice-number,
.invoice_style1 .invoice-date {
  font-size: 18px;
  color: var(--white-color);
}

.invoice_style1 .invoice-number b,
.invoice_style1 .invoice-date b {
  color: var(--white-color);
}

.invoice_style1 .invoice-number {
  margin-top: 8px;
  margin-bottom: 5px;
}

.invoice_style1 .header-bottom {
  margin-bottom: 50px;
}

.invoice_style1 .body-shape1 {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

/*------------------- 2.3. Template 2 -------------------*/
/* Template 2 ---------------------------------- */
.invoice_style2 {
  padding-bottom: 10px;
}

.invoice_style2 .header-logo {
  margin-top: -20px;
}

.invoice_style2 .big-title {
  margin-top: -0.1em;
  margin-bottom: 12px;
}

.invoice_style2 .body-shape1 {
  top: 0;
  width: 100%;
}

.invoice_style2 .body-shape2 {
  bottom: 0;
}

.invoice_style2 .total-table tr:last-child {
  background: -webkit-linear-gradient(bottom, #21171F 0%, #3E4049 100%);
  background: linear-gradient(0deg, #21171F 0%, #3E4049 100%);
}

.invoice_style2 .total-table tr:last-child th, .invoice_style2 .total-table tr:last-child td {
  color: var(--white-color);
}

.invoice_style2 .invoice-buttons {
  margin-bottom: 30px;
  margin-left: 508px;
  margin-top: 30px;
}

.invoice_style2 .footer-info {
  position: absolute;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 23px 50px;
}

.invoice_style2 .footer-info p {
  margin-right: 25px;
  color: var(--white-color);
}

.invoice_style2 .footer-info svg {
  margin-right: 3px;
}

/*------------------- 2.4. Template 3 -------------------*/
/* Template 3 ---------------------------------- */
.invoice_style3 .big-title {
  font-size: 70px;
  color: var(--white-color);
  margin-top: -0.18em;
}

.invoice_style3 .body-shape1 {
  top: 0;
  right: 0;
  left: unset;
}

.invoice_style3 .body-shape2 {
  bottom: 150px;
}

.invoice_style3 .invoice-table thead th,
.invoice_style3 .invoice-table thead td {
  background: -webkit-linear-gradient(top, #BED5EF -35.51%, #557497 86.64%);
  background: linear-gradient(180deg, #BED5EF -35.51%, #557497 86.64%);
}

.invoice_style3 .invoice-table {
  margin-bottom: 30px;
}

.invoice_style3 .invoice-buttons {
  margin-top: 35px;
}

.table-stripe-column tbody {
  background-color: #f5f5f5;
}

.table-stripe-column tbody th:nth-child(odd), .table-stripe-column tbody td:nth-child(odd) {
  background-color: #E7E9ED;
}

.table-stripe-column th:nth-last-child(-n + 3), .table-stripe-column td:nth-last-child(-n + 3) {
  text-align: center;
}

.table-stripe-column tr:last-child {
  border-bottom: none;
}

/*------------------- 2.5. Template 4 -------------------*/
/* Template 4 ---------------------------------- */
.invoice_style4 {
  padding-bottom: 60px;
}

.invoice_style4 .body-shape1 {
  top: 0;
}

.invoice_style4 .th-header {
  margin-top: -37px;
  margin-bottom: 63px;
}

.invoice_style4 .th-header b {
  font-size: 18px;
}

.invoice_style4 .big-title {
  margin-bottom: 33px;
}

.invoice_style4 .total-table {
  background-color: var(--smoke-color);
}

.invoice_style4 .total-table tr {
  border-top: none;
}

.invoice_style4 .total-table th {
  padding-left: 500px !important;
}

.invoice_style4 .footer-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--theme-color);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: 20px 50px 20px 80px;
  border-radius: 35px 0 0 0;
  z-index: -2;
}

.invoice_style4 .footer-info:before {
  content: '';
  position: absolute;
  inset: 0;
  left: 30px;
  background-color: #242437;
  z-index: -1;
  border-radius: inherit;
}

.invoice_style4 .footer-info svg {
  margin-right: 4px;
}

.invoice_style4 .footer-info p {
  color: var(--white-color);
}

.invoice-table.style3 {
  table-layout: fixed;
}

.invoice-table.style3 th:first-child,
.invoice-table.style3 td:first-child {
  width: unset;
}

.invoice-table.style3 th:nth-last-child(-n + 3),
.invoice-table.style3 td:nth-last-child(-n + 3) {
  width: unset;
}

.invoice-table.style3 th, .invoice-table.style3 td {
  width: 25%;
}

.invoice-table.style3 th:nth-child(3), .invoice-table.style3 td:nth-child(3) {
  width: 100px;
}

.invoice-table.style3 tr {
  border-bottom: none;
}

.invoice-table.style3 th {
  background-color: #242437;
}

.invoice-table.style3 th:last-child {
  text-align: left;
}

.invoice-table.style3 td {
  background-color: var(--smoke-color);
}

.invoice-table.style3 td:last-child {
  text-align: left;
}

/*------------------- 2.6. Template 5 -------------------*/
/* Template 5 ---------------------------------- */
.table-stripe3 {
  border: 1px solid var(--smoke-color);
}

.table-stripe3 thead tr {
  border-bottom: 1px solid var(--smoke-dark);
}

.table-stripe3 tr {
  border-bottom: 1px solid var(--smoke-color);
}

.table-stripe3 tr th, .table-stripe3 tr td {
  border-right: 1px solid var(--border-color);
}

.table-stripe3 tr th:nth-child(2), .table-stripe3 tr td:nth-child(2) {
  text-align: left;
}

.table-stripe3 tr th:last-child, .table-stripe3 tr td:last-child {
  border-right: none;
}

.table-stripe3 tr:nth-child(even) th, .table-stripe3 tr:nth-child(even) td {
  background-color: var(--smoke-color);
}

.table-stripe3 thead th, .table-stripe3 thead td {
  background-color: var(--smoke-dark) !important;
  border-radius: 0 !important;
  border-top: 1px solid #E0E0E0;
}

.invoice_style5 {
  padding-bottom: 30px;
}

.invoice_style5 .th-header {
  margin-bottom: 35px;
}

.invoice_style5 .total-table {
  background-color: var(--smoke-color);
}

.invoice_style5 .total-table tr {
  border-top: none;
}

.invoice_style5 .total-table th {
  padding-left: 500px !important;
}

.header-layout4 .big-title,
.header-layout5 .big-title {
  margin-top: -0.18em;
  margin-bottom: 15px;
}

.invoice-table.style4 {
  --border-color: #fff;
}

.invoice-table.style4 th, .invoice-table.style4 td {
  border-right: 1px solid var(--white-color);
}

.invoice-table.style4 th:nth-last-child(-n + 3), .invoice-table.style4 th:first-child, .invoice-table.style4 td:nth-last-child(-n + 3), .invoice-table.style4 td:first-child {
  width: unset;
  text-align: left;
}

.invoice-table.style4 td {
  background-color: var(--smoke-color);
}

.invoice-table.style4 .blank-row td {
  background-color: var(--white-color);
}

/*------------------- 2.7. Template 6 -------------------*/
/* Template 6 ---------------------------------- */
.invoice_style7,
.invoice_style6 {
  padding-bottom: 75px;
}

.invoice_style7 .body-shape1,
.invoice_style6 .body-shape1 {
  top: 0;
}

.invoice_style7 .body-shape2,
.invoice_style6 .body-shape2 {
  bottom: 0;
}

.invoice_style7 .th-header,
.invoice_style6 .th-header {
  margin-bottom: 35px;
}

.invoice_style7 .big-title,
.invoice_style6 .big-title {
  margin-top: -0.18em;
  margin-bottom: 15px;
}

.invoice_style7 .total-table tr:last-child,
.invoice_style6 .total-table tr:last-child {
  background: -webkit-linear-gradient(bottom, #21171F 0%, #3E4049 100%);
  background: linear-gradient(0deg, #21171F 0%, #3E4049 100%);
}

.invoice_style7 .total-table tr:last-child th, .invoice_style7 .total-table tr:last-child td,
.invoice_style6 .total-table tr:last-child th,
.invoice_style6 .total-table tr:last-child td {
  color: var(--white-color);
}

.invoice_style7 .footer-info,
.invoice_style6 .footer-info {
  position: absolute;
  right: 50px;
  bottom: 22px;
  text-align: right;
}

.invoice_style7 .footer-info p,
.invoice_style6 .footer-info p {
  margin-top: 10px;
  color: var(--white-color);
}

.address-bg1 {
  background-color: var(--smoke-color);
  padding: 25px 30px;
}

.table-stripe4 th, .table-stripe4 td {
  border-right: 1px solid #e0e0e0;
}

.table-stripe4 th:nth-last-child(-n + 3), .table-stripe4 th:first-child, .table-stripe4 td:nth-last-child(-n + 3), .table-stripe4 td:first-child {
  width: unset;
  text-align: left;
}

.table-stripe4 th:first-child, .table-stripe4 td:first-child {
  border-left: 1px solid #e0e0e0;
}

.table-stripe4 th {
  background-image: -webkit-linear-gradient(top, #BED5EF -35.51%, #557497 86.64%);
  background-image: linear-gradient(180deg, #BED5EF -35.51%, #557497 86.64%);
}

.table-stripe4 tr {
  border-bottom: 1px solid #E7E9ED;
}

.table-stripe4 tr:nth-child(even) {
  background-color: #E7E9ED;
}

.table-stripe4.theme-color th {
  background-image: none;
}

/*------------------- 2.8. Template 7 -------------------*/
/* Template 7 ---------------------------------- */
.invoice_style7 {
  padding-bottom: 0;
  border-bottom: 15px solid var(--theme-color);
}

.invoice_style7 .address-box {
  padding: 15px 20px;
}

.invoice_style7 .address-left {
  border-right: none;
  border-radius: 0;
}

.invoice_style7 .address-right {
  border-radius: 0;
}

.invoice_style7 .address-middle {
  border-right: none;
}

.invoice_style7 .table2 {
  margin-top: 30px;
}

.invoice_style7 .th-header {
  margin-top: 50px;
  padding-right: 30px;
}

.invoice_style7 .total-table tr:last-child {
  background-image: none;
  background-color: var(--theme-color);
}

.table-style3 {
  --smoke-color: #E7E9ED;
  border: 1px solid var(--smoke-color);
}

.table-style3 tr {
  border-bottom: 1px solid var(--smoke-color);
}

.table-style3 tr:nth-child(odd) th, .table-style3 tr:nth-child(odd) td {
  background-color: var(--smoke-color);
}

.table-style3 th, .table-style3 td {
  border-right: 1px solid #f5f5f5;
  width: 27%;
  padding: 11px;
}

.table-style3 th:last-child, .table-style3 td:last-child {
  border-right: none;
  text-align: left;
}

.table-style3 th:first-child, .table-style3 td:first-child {
  width: 19%;
}

/*------------------- 2.9. Template 8 -------------------*/
/* Template 8 ---------------------------------- */
.invoice_style8 {
  --border-color: #DADADA;
}

.invoice_style8 .invoice-table {
  --border-color: #DADADA;
  text-align: center;
}

.invoice_style8 .invoice-table tbody tr:last-child {
  border-bottom: 1px solid var(--border-color);
}

.invoice_style8 .invoice-table tbody,
.invoice_style8 .invoice-table tfoot {
  background-color: #F9F9F9;
}

.total-table3 {
  border: none;
}

.total-table3 th, .total-table3 td {
  border: none;
  padding: 5px 45px;
}

.total-table3 th:last-child, .total-table3 td:last-child {
  text-align: right;
  padding-right: 20px;
}

.table-style4 {
  border: 1px solid var(--smoke-color);
}

.table-style4 thead tr {
  border-bottom: 1px solid var(--smoke-dark);
}

.table-style4 thead th {
  border-radius: 0 !important;
}

.table-style4 tr {
  border-bottom: none;
}

.table-style4 th, .table-style4 td {
  text-align: center;
  border-right: 1px solid var(--border-color);
  width: 21%;
}

.table-style4 th:last-child, .table-style4 td:last-child {
  border-right: none;
  text-align: center;
}

.table-style4 th:first-child, .table-style4 td:first-child {
  width: 37%;
}

/*------------------- 2.0. Template 9 -------------------*/
/* Template 9 ---------------------------------- */
.invoice_style9 {
  --border-color: #DADADA;
  padding-bottom: 50px;
}

.invoice_style9 .invoice-table th {
  background: -webkit-linear-gradient(top, #01B3F2 0%, #6327ED 100%);
  background: linear-gradient(180deg, #01B3F2 0%, #6327ED 100%);
}

.invoice_style9 .invoice-table.style4 {
  border: 1px solid var(--smoke-color);
  border-top: none;
}

.invoice_style9 .invoice-table.style4 th:last-child,
.invoice_style9 .invoice-table.style4 td:last-child {
  border-right: 1px solid var(--smoke-color);
}

.invoice_style9 .invoice-table.style4 tr:last-child {
  border-bottom: 1px solid var(--smoke-color);
}

.invoice_style9 .table-stripe-column {
  text-align: center;
}

.invoice_style9 .table-stripe-column tbody tr:last-child {
  border-bottom: 1px solid var(--border-color);
}

.invoice_style9 .table-stripe-column tbody,
.invoice_style9 .table-stripe-column tfoot {
  background-color: #F9F9F9;
}

.invoice_style9 .footer-info {
  position: absolute;
  bottom: 0;
  left: 50px;
  width: calc(100% - 100px);
  background-image: -webkit-linear-gradient(top, #01B3F2 0%, #6327ED 100%);
  background-image: linear-gradient(180deg, #01B3F2 0%, #6327ED 100%);
  border-radius: 100px 100px 0px 0px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: 15px 50px;
  z-index: -2;
}

.invoice_style9 .footer-info svg {
  margin-right: 4px;
}

.invoice_style9 .footer-info p {
  color: var(--white-color);
}

.invoice_style9 .invoice-buttons a::before,
.invoice_style9 .invoice-buttons button::before {
  background: -webkit-linear-gradient(top, #01B3F2 0%, #6327ED 100%);
  background: linear-gradient(180deg, #01B3F2 0%, #6327ED 100%);
}

/*------------------- 2.0. Template 10 -------------------*/
/* Template 10 ---------------------------------- */
.invoice_style10 {
  --border-color: #DADADA;
  border-bottom: 10px solid;
  -webkit-border-image: -webkit-linear-gradient(357.43deg, #565BED 0%, #A664E8 100%);
          border-image: linear-gradient(92.57deg, #565BED 0%, #A664E8 100%);
  border-image-slice: 1;
}

.invoice_style10 .big-title {
  margin-bottom: 10px;
}

.invoice_style10 .th-header p,
.invoice_style10 .th-header b,
.invoice_style10 .th-header .big-title {
  color: var(--white-color);
}

.invoice_style10 .th-header .header-logo {
  margin-top: 35px;
}

.invoice_style10 .table-style5 th {
  background-color: transparent;
}

.invoice_style10 .table-style5 thead tr {
  background-image: -webkit-linear-gradient(357.43deg, #565BED 0%, #A664E8 100%);
  background-image: linear-gradient(92.57deg, #565BED 0%, #A664E8 100%);
}

.invoice_style10 .body-shape1 {
  top: 0;
}

.invoice_style10 .invoice-buttons a::before,
.invoice_style10 .invoice-buttons button::before {
  background-image: -webkit-linear-gradient(357.43deg, #565BED 0%, #A664E8 100%);
  background-image: linear-gradient(92.57deg, #565BED 0%, #A664E8 100%);
}

.table-style5 {
  table-layout: fixed;
}

.table-style5 th, .table-style5 td {
  padding: 13px 25px;
}

.table-style5 th:first-child, .table-style5 td:first-child {
  width: 60px;
  padding: 13px;
  text-align: center;
  background-color: #242437 !important;
  color: var(--white-color);
  border-bottom: 1px solid #242437;
}

.table-style5 th:nth-last-child(-n + 3), .table-style5 td:nth-last-child(-n + 3) {
  width: unset;
}

.table-style5 th:nth-child(2), .table-style5 td:nth-child(2) {
  width: 50%;
}

.table-style5 tbody {
  background-color: #f5f5f5;
}

.table-style5 tbody th:nth-child(odd), .table-style5 tbody td:nth-child(odd) {
  background-color: #E7E9ED;
}

.table-style5 tr:last-child {
  border-bottom: none;
}

.table-style5 tbody tr:last-child {
  border-bottom: 1px solid var(--border-color);
}

.table-style5 tbody,
.table-style5 tfoot {
  background-color: #F9F9F9;
}

.table-style5 .text-start {
  text-align: left !important;
}

/*------------------- 2.0. Template 11 -------------------*/
/* Template 11 ---------------------------------- */
.header-layout8 {
  background-color: var(--theme-color);
  padding: 15px 30px;
  border-radius: 999px;
}

.header-layout8 .big-title {
  color: var(--white-color);
  margin-bottom: -0.1em;
}

.invoice_style11 {
  --border-color: #DADADA;
  --info-width: 186px;
  padding-bottom: 15px;
}

.invoice_style11 .header-bottom {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  padding-right: 30px;
  margin-top: 15px;
  margin-bottom: 55px;
}

.invoice_style11 .body-shape1 {
  top: 0;
}

.invoice_style11 .body-shape2 {
  bottom: 0;
  left: 50px;
  line-height: 0;
}

.invoice_style11 .table-stripe-column {
  --border-color: #DADADA;
  text-align: center;
  table-layout: fixed;
}

.invoice_style11 .table-stripe-column tbody tr:last-child {
  border-bottom: 1px solid var(--border-color);
}

.invoice_style11 .table-stripe-column tbody,
.invoice_style11 .table-stripe-column tfoot {
  background-color: #F9F9F9;
}

.invoice_style11 .table-stripe-column .bg-inherit {
  background-color: inherit !important;
}

.invoice_style11 .table-stripe-column th, .invoice_style11 .table-stripe-column td {
  padding: 13px 25px;
}

.invoice_style11 .table-stripe-column th:first-child, .invoice_style11 .table-stripe-column td:first-child {
  width: 80px;
  padding: 13px;
}

.invoice_style11 .table-stripe-column th:nth-last-child(-n + 3), .invoice_style11 .table-stripe-column td:nth-last-child(-n + 3) {
  width: unset;
}

.invoice_style11 .table-stripe-column th:nth-child(2), .invoice_style11 .table-stripe-column td:nth-child(2) {
  width: 50%;
}

/*------------------- 2.0. Template 12 -------------------*/
/* Template 12 ---------------------------------- */
.invoice_style12 {
  --border-color: #DADADA;
}

.invoice_style12 .big-title {
  margin-bottom: 5px;
}

.invoice_style12 .body-shape1 {
  top: 0;
}

.invoice_style12 .table-stripe-column {
  --border-color: #DADADA;
  text-align: center;
  table-layout: fixed;
}

.invoice_style12 .table-stripe-column tbody tr:last-child {
  border-bottom: 1px solid var(--border-color);
}

.invoice_style12 .table-stripe-column tbody,
.invoice_style12 .table-stripe-column tfoot {
  background-color: #F9F9F9;
}

.invoice_style12 .table-stripe-column .bg-inherit {
  background-color: inherit !important;
}

.invoice_style12 .table-stripe-column th, .invoice_style12 .table-stripe-column td {
  padding: 13px 25px;
}

.invoice_style12 .table-stripe-column th:first-child, .invoice_style12 .table-stripe-column td:first-child {
  width: 80px;
  padding: 13px;
}

.invoice_style12 .table-stripe-column th:nth-last-child(-n + 3), .invoice_style12 .table-stripe-column td:nth-last-child(-n + 3) {
  width: unset;
}

.invoice_style12 .table-stripe-column th:nth-child(2), .invoice_style12 .table-stripe-column td:nth-child(2) {
  width: 45%;
}

.info-box3 {
  background-color: var(--theme-color);
  color: var(--white-color);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 18px 30px;
  -webkit-clip-path: polygon(0 0, calc(100% - 25px) 0%, 100% 100%, 0% 100%);
          clip-path: polygon(0 0, calc(100% - 25px) 0%, 100% 100%, 0% 100%);
}

.info-box3 b {
  color: var(--white-color);
  font-size: 16px;
  margin-right: 60px;
}

.info-box3.style2 {
  text-align: right;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  background-color: #031C33;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 25px 100%);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 25px 100%);
}

.table-stripe4.black-color th {
  background-color: #242437;
  background-image: none;
}

/*------------------- 2.0. Template RTL -------------------*/
/* Template RTL ---------------------------------- */
[dir='rtl'] .invoice-buttons {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -webkit-flex-direction: row-reverse;
      -ms-flex-direction: row-reverse;
          flex-direction: row-reverse;
}

[dir='rtl'] .invoice-buttons button svg {
  margin-left: 6px;
  margin-right: 0;
}

[dir='rtl'] .header-layout12 .big-title {
  text-align: left;
  font-size: 40px;
}

[dir='rtl'] .header-layout12 span {
  text-align: left;
}

[dir='rtl'] .invoice-right {
  text-align: left;
}

[dir='rtl'] .table-style9 th:last-child, [dir='rtl'] .table-style9 td:last-child {
  border-right: 1px solid var(--smoke-color);
  text-align: left;
}

[dir='rtl'] .table-style9 tfoot th:not(:last-child), [dir='rtl'] .table-style9 tfoot td:not(:last-child) {
  padding-left: 0;
  text-align: left;
}

[dir='rtl'] .total-table2 th:last-child, [dir='rtl'] .total-table2 td:last-child {
  text-align: left;
}

/*------------------- 3 Updates -------------------*/
/*------------------- 3.1 Update 1 -------------------*/
.color_blue {
  --smoke-dark: #2D7CFE;
}

.color_blue th {
  color: var(--white-color);
}

.template_shape1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
}

.body-shape9 img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.th-header.style_white h1,
.th-header.style_white .h1,
.th-header.style_white p,
.th-header.style_white span,
.th-header.style_white b {
  color: var(--white-color);
}

.th-header.style_white b {
  font-weight: 600;
}

.th-header.style_white .svg-shape1 {
  left: 25px;
  width: calc(100% - 50px);
  -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
          transform: translate(0, 0);
}

.th-header.style_white .svg-shape1 img {
  height: 100%;
  width: 100%;
}

/*---------- Dark Mode ----------*/
.dark_mode {
  --white-color: #111111;
  --title-color: #fff;
  --body-color: #E7E9ED;
  --smoke-color: #1A2733;
  --smoke-dark: #2D7CFE;
  --border-color: #1A2733;
}

.dark_mode address,
.dark_mode td {
  color: var(--body-color);
}

.dark_mode .address-box {
  background-color: var(--smoke-color);
  --border-color: #323D45;
}

.dark_mode .print_btn {
  color: var(--theme-color);
}

.dark_mode .print_btn:hover {
  background-color: var(--smoke-color);
}

.dark_mode .download_btn {
  color: #fff;
}

.dark_mode .download_btn:hover {
  background-color: var(--smoke-color);
}

/*# sourceMappingURL=style.css.map */
`
  return (
    <html>
      <head>
        <style>{styles}</style>
      </head>
    <div class="invoice-container-wrap">
    <div class="invoice-container">
            <div class="th-invoice invoice_style9" data-bg-src="assets/img/template/hosting_bg.png">
                <div class="download-inner" id="download_section">
                    <header class="th-header header-layout4">
                        <div class="row justify-content-between">
                            <div class="col-auto">
                                <div class="header-logo">
                                    <a href="index.html"><img src="assets/img/logo-hosting.svg" alt="Invar"></img></a>
                                </div>
                            </div>
                            <div class="col-auto">
                                <h1 class="big-title">Invoice</h1>
                                <p class="invoice-number"><b>Invoice No: </b>#935648</p>
                            </div>
                        </div>
                    </header>

                    <p class="table-title text-center"><b>Customer Info:</b></p>
                    <table class="invoice-table style4">
                        <thead>
                            <tr>
                                <th>Name:</th>
                                <th>Phone:</th>
                                <th>Email:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{employee.name}</td>
                                <td>+153 6547 6987</td>
                                <td>info@alexjender.com</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="bg-white"><b>Address:</b>4 Balmy Beach Road, Owen Sound, Ontario, Canada</td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="invoice-table table-stripe-column">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Item Descriptions</th>
                                <th>Price</th>
                                <th>Tax</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>{device.name}</td>
                                <td>$20.00</td>
                                <td>0%</td>
                                <td>$20.00</td>
                            </tr>
                            <tr>
                                <td>02</td>
                                <td>30 GB Hosting - (Business Package #SHP2564874) 1 Years</td>
                                <td>$525.00</td>
                                <td>0%</td>
                                <td>$525.30</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4"><b>Total Amount:</b></td>
                                <td>$545.30</td>
                            </tr>
                        </tfoot>
                    </table>

                    <p class="invoice-note mt-3">
                        <b>NOTE: </b>This is computer generated receipt and does not require physical signature.
                    </p>
                    <div class="footer-info">
                        <p class="mb-0">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="4" fill="#01B3F2" />
                                <path d="M10 4.5C11.125 4.51562 12.1328 4.78906 13.0234 5.32031C13.9297 5.85156 14.6484 6.57031 15.1797 7.47656C15.7109 8.36719 15.9844 9.375 16 10.5C15.9844 11.625 15.7109 12.6328 15.1797 13.5234C14.6484 14.4297 13.9297 15.1484 13.0234 15.6797C12.1328 16.2109 11.125 16.4844 10 16.5C8.875 16.4844 7.86719 16.2109 6.97656 15.6797C6.07031 15.1484 5.35156 14.4297 4.82031 13.5234C4.28906 12.6328 4.01562 11.625 4 10.5C4.01562 9.375 4.28906 8.36719 4.82031 7.47656C5.35156 6.57031 6.07031 5.85156 6.97656 5.32031C7.86719 4.78906 8.875 4.51562 10 4.5ZM10 15.75C10.2031 15.75 10.4297 15.6484 10.6797 15.4453C10.9297 15.2422 11.1875 14.8984 11.4531 14.4141C11.6875 13.9297 11.8672 13.375 11.9922 12.75H7.98438C8.125 13.375 8.3125 13.9297 8.54688 14.4141C8.8125 14.8984 9.07031 15.2422 9.32031 15.4453C9.57031 15.6484 9.79688 15.75 10 15.75ZM7.84375 12H12.1562C12.2188 11.5312 12.25 11.0312 12.25 10.5C12.25 9.96875 12.2188 9.46875 12.1562 9H7.84375C7.78125 9.46875 7.75 9.96875 7.75 10.5C7.75 11.0312 7.78125 11.5312 7.84375 12ZM11.9922 8.25C11.8672 7.60938 11.6875 7.05469 11.4531 6.58594C11.1875 6.10156 10.9297 5.75781 10.6797 5.55469C10.4297 5.35156 10.2031 5.25 10 5.25C9.79688 5.25 9.57031 5.35156 9.32031 5.55469C9.07031 5.75781 8.8125 6.10156 8.54688 6.58594C8.3125 7.05469 8.125 7.60938 7.98438 8.25H11.9922ZM12.8828 9C12.9609 9.48438 13 9.98438 13 10.5C13 11.0156 12.9609 11.5156 12.8828 12H15.0391C15.1797 11.5156 15.25 11.0156 15.25 10.5C15.25 9.98438 15.1797 9.48438 15.0391 9H12.8828ZM11.6875 5.53125C12.1875 6.20312 12.5547 7.10938 12.7891 8.25H14.7344C14.4375 7.60938 14.0234 7.05469 13.4922 6.58594C12.9609 6.11719 12.3594 5.76562 11.6875 5.53125ZM8.33594 5.53125C7.64844 5.76562 7.03906 6.11719 6.50781 6.58594C5.97656 7.05469 5.5625 7.60938 5.26562 8.25H7.21094C7.44531 7.10938 7.82031 6.20312 8.33594 5.53125ZM4.75 10.5C4.75 11.0156 4.82031 11.5156 4.96094 12H7.09375C7.03125 11.5156 7 11.0156 7 10.5C7 9.98438 7.03125 9.48438 7.09375 9H4.96094C4.82031 9.48438 4.75 9.98438 4.75 10.5ZM14.7344 12.75H12.7891C12.5547 13.8906 12.1875 14.7969 11.6875 15.4688C12.3594 15.2344 12.9609 14.8828 13.4922 14.4141C14.0234 13.9453 14.4375 13.3906 14.7344 12.75ZM7.21094 12.75H5.26562C5.5625 13.3906 5.97656 13.9453 6.50781 14.4141C7.03906 14.8828 7.64844 15.2344 8.33594 15.4688C7.82031 14.7969 7.44531 13.8906 7.21094 12.75Z" fill="white" />
                            </svg>
                            www.dominhosting.com
                        </p>
                        <p class="mb-0">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="4" fill="#01B3F2" />
                                <path d="M15.25 12C15.5312 12.125 15.7344 12.3203 15.8594 12.5859C15.9844 12.8359 16.0156 13.1094 15.9531 13.4062L15.4609 15.5391C15.3984 15.8359 15.2578 16.0703 15.0391 16.2422C14.8203 16.4141 14.5703 16.5 14.2891 16.5C12.3672 16.4844 10.6328 16.0156 9.08594 15.0938C7.55469 14.1719 6.32812 12.9453 5.40625 11.4141C4.48438 9.86719 4.01562 8.13281 4 6.21094C4 5.92969 4.08594 5.67969 4.25781 5.46094C4.42969 5.24219 4.66406 5.09375 4.96094 5.01562L7.09375 4.52344C7.39062 4.46094 7.66406 4.5 7.91406 4.64062C8.17969 4.76562 8.375 4.96875 8.5 5.25L9.48438 7.57031C9.59375 7.82031 9.61719 8.07812 9.55469 8.34375C9.49219 8.60938 9.35156 8.82812 9.13281 9L8.33594 9.65625C8.96094 10.7031 9.80469 11.5391 10.8672 12.1641L11.5234 11.3672C11.6953 11.1484 11.9141 11.0078 12.1797 10.9453C12.4453 10.8828 12.7031 10.9062 12.9531 11.0156L15.25 12ZM16.25 19.25V14.25H3.75C3.38542 14.25 3.08594 14.3828 2.85156 14.1484C2.61719 13.9141 2.5 13.6146 2.5 13.25V8.25C2.5 7.98438 2.61719 7.78594 2.85156 7.65156C3.08594 7.51719 3.38542 7.75 3.75 7.75H16.25C16.6146 7.75 16.9141 7.8828 17.1484 8.1484C17.3828 8.4141 17.5 8.83594 17.5 9.25V13.25C17.5 13.6146 17.3828 13.9141 17.1484 14.1484C16.9141 14.3828 16.6146 14.25 16.25 14.25ZM12.8828 9C12.9609 9.48438 13 9.98438 13 10.5C13 11.0156 12.9609 11.5156 12.8828 12H15.0391C15.1797 11.5156 15.25 11.0156 15.25 10.5C15.25 9.98438 15.1797 9.48438 15.0391 9H12.8828ZM11.6875 5.53125C12.1875 6.20312 12.5547 7.10938 12.7891 8.25H14.7344C14.4375 7.60938 14.0234 7.05469 13.4922 6.58594C12.9609 6.11719 12.3594 5.76562 11.6875 5.53125ZM8.33594 5.53125C7.64844 5.76562 7.03906 6.11719 6.50781 6.58594C5.97656 7.05469 5.5625 7.60938 5.26562 8.25H7.21094C7.44531 7.10938 7.82031 6.20312 8.33594 5.53125ZM4.75 10.5C4.75 11.0156 4.82031 11.5156 4.96094 12H7.09375C7.03125 11.5156 7 11.0156 7 10.5C7 9.98438 7.03125 9.48438 7.09375 9H4.96094C4.82031 9.48438 4.75 9.98438 4.75 10.5ZM14.7344 12.75H12.7891C12.5547 13.8906 12.1875 14.7969 11.6875 15.4688C12.3594 15.2344 12.9609 14.8828 13.4922 14.4141C14.0234 13.9453 14.4375 13.3906 14.7344 12.75ZM7.21094 12.75H5.26562C5.5625 13.3906 5.97656 13.9453 6.50781 14.4141C7.03906 14.8828 7.64844 15.2344 8.33594 15.4688C7.82031 14.7969 7.44531 13.8906 7.21094 12.75Z" fill="white" />
                            </svg>
                            +163 2365 4585
                        </p>
                        <p class="mb-0">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="4" fill="#01B3F2" />
                                <path d="M4 7.5C4.01562 7.07812 4.16406 6.72656 4.44531 6.44531C4.72656 6.16406 5.07812 6.01562 5.5 6H14.5C14.9219 6.01562 15.2734 6.16406 15.5547 6.44531C15.8359 6.72656 15.9844 7.07812 16 7.5V13.5C15.9844 13.9219 15.8359 14.2734 15.5547 14.5547C15.2734 14.8359 14.9219 14.9844 14.5 15H5.5C5.07812 14.9844 4.72656 14.8359 4.44531 14.5547C4.16406 14.2734 4.01562 13.9219 4 13.5V7.5ZM5.125 7.5V8.01562L9.17969 11.3438C9.42969 11.5312 9.70312 11.625 10 11.625C10.2969 11.625 10.5781 11.5312 10.8438 11.3438L14.875 8.01562V7.47656C14.8594 7.25781 14.7344 7.13281 14.5 7.10156H5.5C5.26562 7.13281 5.14062 7.25781 5.125 7.47656V7.5ZM5.125 9.46875V13.5C5.14062 13.7344 5.26562 13.8594 5.5 13.875H14.5C14.7344 13.8594 14.8594 13.7344 14.875 13.5V9.46875L11.5469 12.2109C11.0781 12.5703 10.5625 12.75 10 12.75C9.4375 12.75 8.91406 12.5703 8.42969 12.2109L5.125 9.46875Z" fill="white" />
                            </svg>
                            info@invar.com
                        </p>
                    </div>
                </div>
                <div class="invoice-buttons">
                    <button class="print_btn">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.25 13C16.6146 13 16.9141 13.1172 17.1484 13.3516C17.3828 13.5859 17.5 13.8854 17.5 14.25V19.25C17.5 19.6146 17.3828 19.9141 17.1484 20.1484C16.9141 20.3828 16.6146 20.5 16.25 20.5H3.75C3.38542 20.5 3.08594 20.3828 2.85156 20.1484C2.61719 19.9141 2.5 19.6146 2.5 19.25V14.25C2.5 13.8854 2.61719 13.5859 2.85156 13.3516C3.08594 13.1172 3.38542 13 3.75 13H16.25ZM16.25 19.25V14.25H3.75V19.25H16.25ZM17.5 8C18.2031 8.02604 18.7891 8.27344 19.2578 8.74219C19.7266 9.21094 19.974 9.79688 20 10.5V14.875C19.974 15.2656 19.7656 15.474 19.375 15.5C18.9844 15.474 18.776 15.2656 18.75 14.875V10.5C18.75 10.1354 18.6328 9.83594 18.3984 9.60156C18.1641 9.36719 17.8646 9.25 17.5 9.25H2.5C2.13542 9.25 1.83594 9.36719 1.60156 9.60156C1.36719 9.83594 1.25 10.1354 1.25 10.5V14.875C1.22396 15.2656 1.01562 15.474 0.625 15.5C0.234375 15.474 0.0260417 15.2656 0 14.875V10.5C0.0260417 9.79688 0.273438 9.21094 0.742188 8.74219C1.21094 8.27344 1.79688 8.02604 2.5 8V3C2.52604 2.29688 2.77344 1.71094 3.24219 1.24219C3.71094 0.773438 4.29688 0.526042 5 0.5H14.7266C15.0651 0.5 15.3646 0.617188 15.625 0.851562L17.1484 2.375C17.3828 2.60938 17.5 2.90885 17.5 3.27344V8ZM16.25 8V3.27344L14.7266 1.75H5C4.63542 1.75 4.33594 1.86719 4.10156 2.10156C3.86719 2.33594 3.75 2.63542 3.75 3V8H16.25ZM16.875 10.1875C17.4479 10.2396 17.7604 10.5521 17.8125 11.125C17.7604 11.6979 17.4479 12.0104 16.875 12.0625C16.3021 12.0104 15.9896 11.6979 15.9375 11.125C15.9896 10.5521 16.3021 10.2396 16.875 10.1875Z" fill="#111111" />
                        </svg>
                    </button>
                    <button id="download_btn" class="download_btn" onClick={handleDownload}>
                        <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
    </div>
</div>
</html> 
  );
};
}

export default AssignmentReport;
