export const calculateCarts = (data) => {
    const totalTax = (tax, taxUnit, amount, quantity) => {
        const initial = 0
        if (taxUnit === "flat") {
            return tax * quantity;
        } else if (taxUnit === "percent") {
            return Math.round(amount * (tax / 100));
        } else {
            return initial
        }
    }
    const productInfos = data.reduce((carry, el) => {
        const { seller, productId, reserved, attributes } = el;
        const i = carry.find((c) => c.sellerId === seller.id);
        if (!i) {
            carry.push({
                sellerId: seller.id,
                shopName: seller.shopName,
                products: [{
                    productId: productId.id,
                    name: productId.name,
                    amount: Number(getCalculatedPrice(el).price) * reserved,
                    quantity: reserved,
                    variation: attributes,
                    tax: totalTax(
                        Number(productId.tax),
                        productId.taxUnit,
                        Number(getCalculatedPrice(el).price),
                        reserved
                    )
                }],
                price: Number(getCalculatedPrice(el).price) * reserved
            })
        } else {
            i.products.push({
                productId: productId.id,
                name: productId.name,
                amount: Number(getCalculatedPrice(el).price) * reserved,
                quantity: reserved,
                variation: attributes,
                tax: totalTax(
                    Number(productId.tax),
                    productId.taxUnit,
                    Number(getCalculatedPrice(el).price),
                    reserved
                )
            });
            i.price += (Number(getCalculatedPrice(el).price) * reserved)
        }
        return carry;
    }, []);
    const total = productInfos.reduce((a, b) => +a + +b.price, 0);
    const result = {
        sellers: productInfos,
        total,
        couponDiscount: 0,
        cartId: data.map(item => item.id),
        subtotal: 0,
        shippingCount: 0,
        shippingFees: 0,
        estimateDelivery: "0"
    }
    return result;
};

const getCalculatedPrice = (item) => {
    if (item.attributes) {
        const variantName = item.attributes.map(n => n.variant).join("-");
        const normalizeString = (str) => str.split('').sort().join('');
        const normalizedVariant = normalizeString(variantName);
        const attributes = item.productId?.attributes?.attributes.find(a => {
            const normalizedAttribute = normalizeString(a.variant);
            return normalizedAttribute === normalizedVariant;
        });
        if (attributes) {
            let totalPrice;
            if (item.productId.discountUnit === "percent") {
                totalPrice = Math.round(
                    Number(attributes.price) - (Number(attributes.price) * (Number(item.productId.discount) / 100))
                );
            } else if (item.productId.discountUnit === "flat") {
                totalPrice = Math.round(Number(attributes.price) - Number(item.productId.discount));
            }
            return {
                price: totalPrice
            }
        }
        return {
            price: item.productId.totalPrice
        }
    } else {
        return {
            price: item.productId.totalPrice
        }
    }
}