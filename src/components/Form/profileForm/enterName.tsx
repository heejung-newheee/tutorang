// import { FaInfoCircle } from "react-icons/fa";
// import { SFormItem, SInput } from "./profileFormTest.styled";

// const enterName = () => {
//   return (
//     <SFormItem>
//       <label htmlFor="username">이름</label>
//       <SInput
//         type="text"
//         id="username"
//         onChange={(e) => setUsername(e.target.value)}
//         required
//         onFocus={() => setUsernameFocus(true)}
//         onBlur={() => setUsernameFocus(false)}
//         $color={usernameFocus && !!username && !validUsername}
//         $noFocusedColor={!!username && !validUsername}
//         placeholder="실명을 입력하세요"
//         autoComplete="off"
//       />
//       {!!username && !validUsername && (
//         <SPGuideMessage>
//           <FaInfoCircle style={{ marginRight: '5px' }} />
//           2자 이상 6자미만의 한국실명 또는 2자이상 20자 미만의 영문실명을 입력하세요.
//         </SPGuideMessage>
//       )}
//     </SFormItem>
//   );
// };

// export default enterName;
