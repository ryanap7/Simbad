export const NumberFormatter = (
  nominal: number = 0,
  currency?: string
): string => {
  let rupiah = "";
  const nominalref = nominal?.toString().split("").reverse().join("");
  for (let i = 0; i < nominalref?.length; i++) {
    if (i % 3 === 0) {
      rupiah += nominalref?.substr(i, 3) + ".";
    }
  }

  if (currency) {
    return (
      currency +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  } else {
    return rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("");
  }
};

export const formatRupiah = (number: string) => {
  if (!number) return "";
  const numberString = number.replace(/[^,\d]/g, "").toString();
  const split = numberString.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return "Rp " + rupiah;
};
