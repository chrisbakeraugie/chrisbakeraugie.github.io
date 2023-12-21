import React from 'react'

const ThunderstormSVG = ({ stroke = 'black', fill = 'none' }) => (
	<svg
		width="111"
		height="86"
		viewBox="0 0 111 86"
		fill={fill}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M97.1402 24.5441H94.6133C92.0865 24.5441 90.0482 25.0326 88.0141 26.0939H86.9528L86.4643 25.0326C85.403 23.0785 83.8574 21.0402 81.8191 18.9218C79.7808 17.452 76.6812 15.9065 74.1586 14.8452C73.67 14.3567 73.1815 14.3567 72.6129 14.3567C72.1202 14.3567 71.636 13.8682 71.0632 13.8682L73.1815 12.3184C73.6701 12.3184 74.1586 12.3184 74.6513 12.3184V12.8069C77.7467 13.8682 80.8463 15.418 83.3689 17.4563C85.4031 18.9261 86.9571 21.0444 88.0184 23.5712C90.0525 22.5142 92.5792 22.5142 94.6176 22.5142H97.1444C101.301 23.087 104.889 24.5525 106.923 27.1636C109.45 29.1977 111 32.2973 111 35.8012C111 36.3697 111 37.351 111 38.4122C110.511 38.9008 110.511 39.8778 110.023 40.4464C108.393 42.9774 106.359 45.0115 103.828 46.5613C101.301 48.1111 97.7172 49.0882 94.6176 49.0882C94.129 49.0882 93.6405 49.0882 93.1478 49.0882H92.5751C92.0908 49.0882 91.0295 48.5997 90.541 48.5997H90.0525C88.5069 51.1307 86.4643 53.1648 84.4302 54.7146C81.8233 56.2644 78.808 57.2415 75.7084 57.2415C75.1399 57.2415 74.6513 57.2415 74.1628 57.2415C73.1857 56.7529 72.6172 56.753 72.1244 56.753C70.0903 56.2644 68.5363 55.7759 66.9908 54.7188C66.5022 54.2303 66.0137 53.7417 65.4452 53.169L66.9908 51.6234C67.5635 52.1919 68.0521 52.192 68.5364 52.6805C69.5134 53.7418 71.0674 54.2303 72.6172 54.7188C73.1857 54.7188 73.6743 54.7188 74.1628 54.7188C74.6513 54.7188 75.1399 54.7188 75.7084 54.7188C78.2395 54.7188 80.8463 54.2303 82.8804 52.6805C85.4073 51.1349 86.9571 49.0924 88.5069 46.5698V46.0811H89.4839C90.0524 46.0811 90.541 46.5698 91.0295 46.5698C91.518 46.5698 92.0908 46.5698 92.5751 46.5698C92.5751 46.5698 93.1478 46.5698 93.6363 46.5698C94.1248 47.0583 94.1248 47.0583 94.6133 47.0583C97.7087 47.0583 100.236 46.0812 102.767 45.0199C104.885 43.4744 106.919 41.4318 107.9 39.3977C107.9 38.9092 108.389 38.4207 108.389 37.3594C108.962 36.8709 108.962 36.3824 108.962 35.8096C108.962 33.2828 107.412 30.6759 105.374 28.7176C103.331 26.6666 100.236 25.6054 97.1402 24.5441ZM68.0436 58.7828H60.8716C60.383 58.7828 59.8104 58.7828 59.3219 58.2943C59.3219 57.8058 59.3218 57.233 59.8104 56.7445L68.0436 48.5912L58.8291 42.969L47.5846 61.8782H56.2222C56.2222 61.8782 56.795 61.8781 57.2835 62.3667C57.2835 62.9394 57.2835 62.9394 57.2835 63.4238L46.5234 85.3526L68.0436 58.7828ZM49.1344 56.7402C48.5659 56.7402 48.0774 56.7402 47.5888 56.2517C46.039 56.2517 44.982 55.7633 44.0008 54.702C42.9395 56.2518 40.9054 57.2288 39.3514 58.2901C37.3172 58.7786 35.2788 59.2713 33.2405 59.2713C31.6949 59.2713 30.7137 59.2714 29.1639 58.7828C28.5912 58.7828 28.1069 58.7828 27.6183 58.2943L29.1639 56.7445C29.6525 56.7445 29.6524 56.7445 29.6524 56.7445C30.7137 57.233 31.6907 57.233 33.2405 57.233C34.7861 57.233 36.8287 56.7445 38.3743 56.256C40.4126 55.2789 41.9624 54.2177 42.9394 52.6679L44.0008 52.1794L44.4893 52.6679C45.5463 53.1564 47.016 53.7291 48.0731 54.2176C48.5616 54.7061 49.6187 54.7061 50.1072 54.7061L49.1344 56.7402ZM70.082 11.8299C69.0249 9.30302 67.5551 6.69614 64.9483 5.14634C62.91 3.11223 59.8104 2.13096 56.795 2.13096C55.2452 2.13096 53.6996 2.61947 52.6383 2.61947C51.1728 3.10799 50.1115 3.67654 49.1344 4.65359C47.0161 6.20338 45.5462 8.2417 44.4934 10.28C43.5163 12.3183 42.9437 14.8452 42.9437 17.4521V19.9789L40.9096 18.4291C39.9325 17.9406 38.3785 16.8793 37.3215 16.3908C35.7717 16.3908 34.226 15.9023 33.2448 15.9023C30.1494 15.9023 27.6225 16.8793 25.5842 18.4291C22.9774 19.9789 21.5076 22.5058 20.4505 25.0284L19.962 26.0897H19.4735H16.3781C12.3014 26.0897 8.71753 27.151 6.10646 29.1851C3.57962 31.2234 2.02987 33.7502 2.02987 36.8456C2.02987 38.8839 2.51832 40.4337 3.57959 41.8993C5.12939 43.4491 6.67495 44.9947 8.71327 46.056C9.77455 46.5445 11.2444 47.033 12.3015 47.5257C13.8513 48.0943 14.8325 48.0943 16.3781 48.0943C16.8666 48.0943 17.3551 48.0943 17.9237 48.0943C18.4164 48.0943 18.9008 47.5257 19.4735 47.5257H19.962L20.4505 48.5828C21.0233 50.1326 22.0003 51.6023 23.5459 52.6594C24.5271 54.2092 25.58 54.6977 27.1341 55.759L25.5842 57.2246C24.0386 56.7361 22.9774 55.7591 21.5076 54.2093C20.4506 53.148 19.4735 51.6023 18.4164 50.1325C18.4164 50.1325 18.4164 50.1325 17.9237 50.1325C17.3551 50.1325 16.8666 50.1325 16.3781 50.1325C14.8325 50.1325 13.2827 50.1326 11.7329 49.644C10.2673 49.644 8.71748 48.5828 7.66042 48.0943C5.13358 47.0372 3.09526 44.9947 2.03399 43.4491C0.488402 41.4108 0 39.3725 0 36.8456C0 33.2575 1.54975 29.6736 4.64093 27.6352C7.6605 25.0242 11.7329 23.5586 16.3781 23.5586H18.4164C19.962 21.0317 22.0045 18.4249 24.0386 16.3866C26.6455 14.8368 29.6609 13.8597 33.2448 13.8597C34.7903 13.8597 36.3402 13.8597 37.8942 14.3482C38.8712 14.8368 39.9283 15.4053 40.421 15.898C40.9096 13.287 41.3981 11.2529 42.4552 9.29458C43.5164 6.68772 45.5505 4.64521 48.0816 3.09963C49.1386 2.12258 50.6084 1.06125 51.6654 0.568517C53.2152 -2.31565e-05 55.2535 0 56.8033 0C60.3915 0 63.8954 1.05707 66.5022 3.66814C69.0333 5.13371 70.5789 7.66474 71.6402 10.2716L70.082 11.8299Z"
			fill={stroke}
		/>
	</svg>
)

export default ThunderstormSVG
